import firebase from "./firebaseInit";
import { ref, reactive } from 'vue';
import { user } from './store/user'

class DBManager {

    db;
    invoices;
    users;

    constructor() {
        this.db = firebase.firestore();
        this.invoices = ref([])
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

    readInvoices(invoices) {
        this.db.collection("invoices")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    invoices.value.push({
                        name: doc.data().name,
                        date_issue: this.parseDateFromFirebase(doc.data().date_issue),
                        date_create: this.parseDateFromFirebase(doc.data().date_create),
                        date_accept: this.parseDateFromFirebase(doc.data().date_accept),
                        date_pay: this.parseDateFromFirebase(doc.data().date_pay),
                        supplier_name : doc.data().supplier_name,
                        supplier_nip : doc.data().supplier_nip,
                        status: doc.data().status
                    });
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }
}

let DBM = new DBManager();

export default DBM

