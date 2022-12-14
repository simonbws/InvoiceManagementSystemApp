import { createRouter, createWebHistory } from 'vue-router'
import firebase from './firebaseInit'
import { Modal } from 'bootstrap'
import { user } from './store/user'
import { storeToRefs } from 'pinia'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/invoices',
        name: 'InvoicesView',
        component: () => import('./views/InvoicesView.vue'),
        meta: {
          authRequired: true,
        }
      },
      {
        path: '/statistics',
        alias:'/charts',
        name: 'ChartsView',
        component: () => import('./views/ChartsView.vue'),
        meta: {
          authRequired: true,
        }
      },
      {
        path: '/newinvoice',
        name: 'NewInvoiceView',
        component: () => import('./views/NewInvoiceView.vue'),
        meta: {
          authRequired: true,
        }
      },
      {
        path: '/editinvoice/:id',
        name: 'EditInvoiceView',
        props: true,
        component: () => import('./views/EditInvoiceView.vue'),
        meta: {
          authRequired: true,
        }
      },
      {
        path: '/',
        alias:'/login',
        name: 'LoginView',
        component: () => import('./views/LoginView.vue')
      },
      {
        path: '/manageusers',
        name: 'ManageUsersView',
        component: () => import('./views/ManageUsersView.vue'),
        meta: {
          authRequired: true,
          adminRequired: true
        }
      },
      {
        path: '/schedule/:which',
        name: 'ScheduleView',
        component: () => import('./views/ScheduleView.vue'),
        props: true,
        meta: {
          authRequired: true
        }
      } 
    ]
  })

  router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.authRequired)) {
          if (to.matched.some(record => record.meta.adminRequired)) {
            const user2 = user()
            if (firebase.auth().currentUser && user2.roleAdmin) {
                next();
            } else {
              document.getElementById('myAlertText').innerHTML = "Dost??p tylko dla administratora"
              let myModal = new Modal(document.getElementById('myAlert'), {
                  keyboard: false
              })
              myModal.show()
              next({
                path: '/',
              });
              setTimeout(()=>{
                myModal.hide();
              },500);
            }
        }
        else if (firebase.auth().currentUser) {
            next();
        } else {
          document.getElementById('myAlertText').innerHTML = "Zaloguj si??, aby uzyska?? dost??p"
          let myModal = new Modal(document.getElementById('myAlert'), {
              keyboard: false
          })
          myModal.show()
          next({
            path: '/',
          });
          setTimeout(()=>{
            myModal.hide();
          },500);
        }
      } else {
          next();
      }
});

export default router