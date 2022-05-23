import firebase from "./firebaseInit";
import { ref, reactive } from 'vue'

class DBManager {

    db;
    invoices;

    constructor() {
        this.db = firebase.firestore();
        this.invoices = ref([])
    }

     readInvoices(invoices) {
        this.db.collection("invoices")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    invoices.value.push({
                        name: doc.data().name,
                        date: doc.data().date_issue.toDate()
                            .toISOString().replace(/T/, ' ').replace(/\.\d\d\dZ/, '')
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

