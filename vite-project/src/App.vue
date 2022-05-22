<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import firebase from "./firebaseInit";
import { ref, reactive } from 'vue'

const db = firebase.firestore();

const invoices = ref([])

function readInvoices() {
  db.collection("invoices")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        invoices.value.push({
          name: doc.data().name
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
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <div v-for="i in invoices">Faktura: {{ i.name }}</div>
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
