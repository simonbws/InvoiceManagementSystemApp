import firebase from "./firebaseInit";
import { ref, reactive } from 'vue';
import { user } from './store/user'

class DBManager {

    db;
    invoices;
    users;
    activeFilters;
    activeSort;

    constructor() {
        this.db = firebase.firestore();
        this.invoices = ref([])
        this.activeFilters = []
        this.activeSort = [];
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

    parseDateFromFirebase(d) {
        if(d)
            return d.toDate().toISOString().replace(/T/, ' ').replace(/\.\d\d\dZ/, '')
        return null
    }

    readInvoices() {
        this.db.collection("invoices")
            .get()
            .then((querySnapshot) => {
                this.invoices.value.length = 0;
                this.invoices.value = [];
                querySnapshot.forEach((doc) => {
                    this.invoices.value.push({
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
}

let DBM = new DBManager();

export default DBM

