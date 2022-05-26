import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './registerServiceWorker'

import { createPinia } from 'pinia'

// import { firestorePlugin } from 'vuefire'
// Vue.use(firestorePlugin);

// createApp(App).mount('#app')

createApp(App)
.use(createPinia())
.use(router)
.mount('#app')
