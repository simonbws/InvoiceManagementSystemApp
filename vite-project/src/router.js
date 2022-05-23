import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        alias:'/invoices',
        name: 'InvoicesView',
        component: () => import('./views/InvoicesView.vue')
      },
      {
        path: '/schedule',
        name: 'ScheduleView',
        component: () => import('./views/ScheduleView.vue')
      },
      {
        path: '/statistics',
        alias:'/charts',
        name: 'ChartsView',
        component: () => import('./views/ChartsView.vue')
      },
    ]
  })