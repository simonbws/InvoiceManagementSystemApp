<script setup>
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
import PageMain from './components/PageMain.vue'
import PageNav from './components/PageNav.vue'


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
  <div id="myAlert" class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body my-alert-body">
          <h5 id="myAlertText">Wylogowano</h5>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex" id="wrapper">
    <page-nav></page-nav>
    <div id="page-content-wrapper">
      <page-header></page-header>
      <page-main>
        <router-view></router-view>
      </page-main>
    </div>
    <!-- <page-footer></page-footer> -->
  </div>
</template>

<style>
.my-alert-body {
  text-align: center;
}

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
