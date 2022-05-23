<script setup>
import firebase from "../firebaseInit";
import { ref, reactive } from 'vue'

const db = firebase.firestore();

const invoices = ref([])

function readInvoices() {
    db.collection("invoices")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                invoices.value.push({
                    name: doc.data().name,
                    date: doc.data().date_issue.toDate()
                        .toISOString().replace(/T/, ' ').replace(/\.\d\d\dZ/, '')
                });
            });
            console.log(invoices)

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}
readInvoices();
</script>

<template>
    <div class="container-fluid">
        <div class="container">
            <div v-for="i in invoices" class="card text-dark bg-light mb-3 mt-3">
                <div class="card-header">Faktura</div>
                <div class="card-body">
                    <h5 class="card-title">{{ i.name }}</h5>
                    <p class="card-text">{{ i.date }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>