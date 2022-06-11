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
                } else if (filter.includes("date")) {
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
                if (!a.hasOwnProperty(field) || !b.hasOwnProperty(field)) {
                    return 0;
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

}

let DBM = new DBManager();

export default DBM

