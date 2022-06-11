import firebase from "./firebaseInit";
import { ref, reactive } from 'vue';
import { user } from './store/user'

class DBManager {

    db;
    invoices;
    users;
    activeFilters;
    activeSort;
    statuses;
    divisionLabels;
    divisionValues;

    constructor() {
        this.db = firebase.firestore();
        this.invoices = ref([])
        this.activeFilters = []
        this.activeSort = [];
        this.statuses = [0,0];
        this.divisionLabels = []
        this.divisionValues = []
    }

    readUserRole(){
        const user2 = user()
        this.db.collection("users").doc(user2.userEmail)
        .get()
        .then((querySnapshot) => {
            if(querySnapshot.data().role == "admin") {
                user2.setCreate(true);
                user2.setAccept(true);
                user2.setAdmin(true);
            } else if(querySnapshot.data().role == "accept") {
                user2.setCreate(false);
                user2.setAccept(true);
                user2.setAdmin(false);
            } else if(querySnapshot.data().role == "standard") {
                user2.setCreate(true);
                user2.setAccept(false);
                user2.setAdmin(false);
            } else {
                user2.setCreate(false);
                user2.setAccept(false);
                user2.setAdmin(false);
            }
            console.log("ROLE:", user2.roleCreate, user2.roleAccept, user2.roleAdmin)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
            user2.setCreate(false);
            user2.setAccept(false);
            user2.setAdmin(false);
        });
    }

    readUsers(users) {
        this.db.collection("users")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    users.value.push({
                        email: doc.id,
                        role: doc.data().role
                    });
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    checkUser(email, callback, notexists) {
        this.db.collection("users").doc(email)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.exists) {
                    callback()
                } else {
                    notexists()
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    deleteUser(email) {
        this.db.collection("users").doc(email)
            .delete()
            .catch((error) => {
                console.log("Error deleting documents: ", error);
            });
    }

    addUser(email, role) {
        this.db.collection("users").doc(email)
            .set({role: role})
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    parseDateFromFirebase(d) {
        if(d)
            return d.toDate().toISOString().replace(/T.+/, '')
        return null
    }

    acceptInvoices(data) {
        for(let i of data) {
            this.db.collection("invoices").doc(i).update({status:'accepted', date_accept: new Date()})
            .then()
            .catch((error) => {
                console.error("Error editing document: ", error);
            });
        }
    }

    createInvoice(data) {
        console.log("CREATE INVOICE", data)
        this.db.collection("invoices").add({
            name: data.name,
            date_issue: new Date(data.date_issue+"T00:00:00Z"),
            date_create: new Date(),
            date_accept: null,
            date_pay: new Date(data.date_pay+"T00:00:00Z"),
            supplier_name : data.supplier_name,
            supplier_nip : data.supplier_nip,
            status: 'created',
            value: data.invoice_value,
            items: data.invoice_items
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
    }

    readInvoices() {
        this.db.collection("invoices")
            .get()
            .then((querySnapshot) => {
                this.invoices.value.length = 0;
                this.invoices.value = [];
                querySnapshot.forEach((doc) => {
                    this.invoices.value.push({
                        id: doc.id,
                        name: doc.data().name,
                        date_issue: this.parseDateFromFirebase(doc.data().date_issue),
                        date_create: this.parseDateFromFirebase(doc.data().date_create),
                        date_accept: this.parseDateFromFirebase(doc.data().date_accept),
                        date_pay: this.parseDateFromFirebase(doc.data().date_pay),
                        supplier_name : doc.data().supplier_name,
                        supplier_nip : doc.data().supplier_nip,
                        status: doc.data().status,
                        value: doc.data().value
                    });
                });
                this.invoices.value = this.applyFilters()
                this.invoices.value = this.applySort()
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    deleteInvoice(id) {
        this.db.collection("invoices").doc(id)
            .delete()
            .catch((error) => {
                console.log("Error deleting documents: ", error);
            });
    }

    setFilters(filters) {
        this.activeFilters = filters;
        this.readInvoices();
    }

    applyFilters(invoices = this.invoices.value, filters=this.activeFilters) {
        console.log("APPLYING FILTERS...", filters)
        return invoices.filter(function (a) {
            for (let f of filters) {
                let filter = f.filter;
                if (filter.includes("value")) {
                  let from = f.from;
                  let to = f.to;
                  if (!a.hasOwnProperty(filter)) {
                    return false;
                  }
                  if (from > a[filter]) return false;
                  if (to < a[filter]) return false;
                }
                else if (filter.includes("status")) {
                    let from = f.from;
                    let to = f.to;
                    if (!a.hasOwnProperty(filter)) {
                      return false;
                    }
                    if (from != a[filter]) return false;
                }
                else if (filter.includes("date")) {
                        let from = f.from;
                        let to = f.to;
                        if (!a.hasOwnProperty(filter)) {
                          return false;
                        }
                        if (from > new Date(a[filter])) return false;
                        if (to < new Date(a[filter])) return false;
                } 
              }
              return true;
        })
    }

    setSort(sort) {
        this.activeSort = sort;
        this.readInvoices();
    }

    applySort(invoices = this.invoices.value, sort=this.activeSort) {
        console.log("APPLYING SORTING...", sort)
        return invoices.sort(function (a, b) {
            let comparison = 0;
            let dir;
            for (let k of sort) {
                let field = k.field
                dir = k.dir
                if (!a[field]) {
                    return -1;
                }
                if (!b[field]) {
                    return 1;
                }
                const varA = (typeof a[field] === 'string') ? a[field].toUpperCase() : a[field];
                const varB = (typeof b[field] === 'string') ? b[field].toUpperCase() : b[field];
                if (varA > varB) {
                    comparison = 1;
                } else if (varA < varB) {
                    comparison = -1;
                }
                comparison = (dir === 'desc') ? (comparison * -1) : comparison
                if (comparison != 0) return comparison
            }
            return (
                (dir === 'desc') ? (comparison * -1) : comparison
            );
        })
    }

    getStatisticsAcceptedAndNot (callback = null) {
        this.db.collection("invoices")
            .get()
            .then((querySnapshot) => {
                this.statuses = [0,0];
                querySnapshot.forEach((doc) => {
                    doc.data().status == 'accepted' ? this.statuses[0]++ : this.statuses[1]++
                });
                if(callback){
                    callback()
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            }); 
    }

    getStatisticsDivision (field, callback = null) {
        this.db.collection("invoices")
            .get()
            .then((querySnapshot) => {
                this.divisionLabels = []
                this.divisionValues = []
                querySnapshot.forEach((doc) => {
                    let x = doc.data()[field];
                    if(x) {
                        if(this.divisionLabels.includes(x)){
                            this.divisionValues[this.divisionLabels.indexOf(x)]++;
                        }else {
                            this.divisionLabels.push(x)
                            this.divisionValues.push(1)
                        }
                    }
                });
                if(callback){
                    callback()
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            }); 
    }

    fillDatabase() {
        const test_data = [
            {
                name: 'FV/202205/1',
                date_issue: new Date("2022-05-23T00:00:00Z"),
                date_create: new Date("2022-05-27T00:00:00Z"),
                date_accept: new Date("2022-06-02T00:00:00Z"),
                date_pay: new Date("2022-06-15T00:00:00Z"),
                supplier_name : 'ABC S.A.',
                supplier_nip : '123-456-789',
                status: 'accepted',
                value: 10,
                items: [{name: 'pozycja', value : 10}]
            },
            {
                name: 'FV/202205/2',
                date_issue: new Date("2022-05-25T00:00:00Z"),
                date_create: new Date("2022-05-27T00:00:00Z"),
                date_accept: null,
                date_pay: new Date("2022-06-15T00:00:00Z"),
                supplier_name : 'ABC S.A.',
                supplier_nip : '123-456-789',
                status: 'created',
                value: 25,
                items: [{name: 'pozycja', value : 10}, {name: 'pozycja 2', value : 15}]
            },
            {
                name: 'FV/202205/3',
                date_issue: new Date("2022-05-29T00:00:00Z"),
                date_create: new Date("2022-05-30T00:00:00Z"),
                date_accept: null,
                date_pay: new Date("2022-06-30T00:00:00Z"),
                supplier_name : 'DEF S.A.',
                supplier_nip : '123-456-789',
                status: 'created',
                value: 35,
                items: [{name: 'pozycja', value : 20}, {name: 'pozycja 2', value : 15}]
            },
            {
                name: 'FV/202206/1',
                date_issue: new Date("2022-06-01T00:00:00Z"),
                date_create: new Date("2022-06-01T00:00:00Z"),
                date_accept: null,
                date_pay: new Date("2022-06-28T00:00:00Z"),
                supplier_name : 'DEF S.A.',
                supplier_nip : '123-456-789',
                status: 'created',
                value: 40,
                items: [{name: 'pozycja', value : 20}, {name: 'pozycja 2', value : 15}, {name: 'pozycja 3', value : 5}]
            },
            {
                name: 'FV/202206/2',
                date_issue: new Date("2022-06-02T00:00:00Z"),
                date_create: new Date("2022-06-03T00:00:00Z"),
                date_accept: new Date("2022-06-10T00:00:00Z"),
                date_pay: new Date("2022-06-30T00:00:00Z"),
                supplier_name : 'DEF S.A.',
                supplier_nip : '123-456-789',
                status: 'accepted',
                value: 42,
                items: [{name: 'pozycja', value : 22}, {name: 'pozycja 2', value : 15}, {name: 'pozycja 3', value : 5}]
            },
            {
                name: 'FV/202206/3',
                date_issue: new Date("2022-06-05T00:00:00Z"),
                date_create: new Date("2022-06-06T00:00:00Z"),
                date_accept: new Date("2022-06-09T00:00:00Z"),
                date_pay: new Date("2022-06-17T00:00:00Z"),
                supplier_name : 'DEF S.A.',
                supplier_nip : '123-456-789',
                status: 'accepted',
                value: 70,
                items: [{name: 'pozycja', value : 50}, {name: 'pozycja 2', value : 15}, {name: 'pozycja 3', value : 5}]
            },
            {
                name: 'FV/202206/4',
                date_issue: new Date("2022-06-05T00:00:00Z"),
                date_create: new Date("2022-06-06T00:00:00Z"),
                date_accept: null,
                date_pay: new Date("2022-06-12T00:00:00Z"),
                supplier_name : 'DEF S.A.',
                supplier_nip : '123-456-789',
                status: 'created',
                value: 52,
                items: [{name: 'pozycja', value : 32}, {name: 'pozycja 2', value : 15}, {name: 'pozycja 3', value : 5}]
            },
            {
                name: 'FV/202206/5',
                date_issue: new Date("2022-06-02T00:00:00Z"),
                date_create: new Date("2022-06-08T00:00:00Z"),
                date_accept: null,
                date_pay: new Date("2022-06-13T00:00:00Z"),
                supplier_name : 'GHI S.A.',
                supplier_nip : '123-456-789',
                status: 'created',
                value: 48,
                items: [{name: 'pozycja', value : 28}, {name: 'pozycja 2', value : 15}, {name: 'pozycja 3', value : 5}]
            },
            {
                name: 'FV/202206/6',
                date_issue: new Date("2022-06-10T00:00:00Z"),
                date_create: new Date("2022-06-11T00:00:00Z"),
                date_accept: null,
                date_pay: new Date("2022-06-11T00:00:00Z"),
                supplier_name : 'GHI S.A.',
                supplier_nip : '123-456-789',
                status: 'created',
                value: 26,
                items: [{name: 'pozycja', value : 6}, {name: 'pozycja 2', value : 15}, {name: 'pozycja 3', value : 5}]
            },
            {
                name: 'FV/202206/7',
                date_issue: new Date("2022-06-08T00:00:00Z"),
                date_create: new Date("2022-06-08T00:00:00Z"),
                date_accept: null,
                date_pay: new Date("2022-06-10T00:00:00Z"),
                supplier_name : 'JKL S.A.',
                supplier_nip : '123-456-789',
                status: 'created',
                value: 29,
                items: [{name: 'pozycja', value : 9}, {name: 'pozycja 2', value : 15}, {name: 'pozycja 3', value : 5}]
            }
        ]
        for(let i of test_data){
            this.db.collection("invoices").add(i).then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
    }
}

let DBM = new DBManager();

export default DBM

