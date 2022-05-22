<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import firebase from "./firebaseInit";
import DoughnutChart from './components/MyChart.ts'
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
readInvoices()
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <div class="container">
    <div v-for="i in invoices" class="card text-dark bg-light mb-3">
      <div class="card-header">Faktura</div>
      <div class="card-body">
        <h5 class="card-title">{{ i.name }}</h5>
        <p class="card-text">{{ i.date }}</p>
      </div>
    </div>
  </div>
  <DoughnutChart />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
