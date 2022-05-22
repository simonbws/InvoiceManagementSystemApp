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
readInvoices();
window.onload = function () {
  let changeView = document.getElementsByClassName('change-view');
  for (let c of changeView) {
    c.addEventListener("click", function (e) {
      e.preventDefault();
      let t = document.getElementsByClassName('change-view');
      for (let i of t) {
        i.classList.remove("active");
      }
      e.target.classList.add('active');
    });
  }
  document.getElementById('menu-toggle').addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById('wrapper').classList.toggle("toggled");
  });
};
</script>

<template>
  <div class="d-flex" id="wrapper">
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">Menu </div>
      <div class="list-group list-group-flush">
        <div class="list-group-item change-view active" change-view="tiles">Faktury</div>
        <div class="list-group-item change-view" change-view="advanced">Harmonogram</div>
        <div class="list-group-item change-view" change-view="advanced">Statystyki</div>
      </div>
    </div>
    <div id="page-content-wrapper">
      <div id="page-content-over" class="hidden"></div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button id="menu-toggle" class="navbar-toggler shadow-none" type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <span class="navbar-brand mb-0 h1"></span>
      </nav>
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
        <DoughnutChart />
      </div>
    </div>
  </div>

</template>

<style>
body {
  overflow-x: hidden;
}

.navbar {
  font-size: 1.2rem
}

.change-view {
  cursor: pointer;
}

#menu-toggle {
  margin-left: 10px;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}

.bg-light {
  background-color: white;
}

#page-content-wrapper {
  background-color: white;
}

#page-content-over {
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: red;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 15rem;
}

.hidden {
  display: none;
}
</style>
