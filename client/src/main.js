import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/common.less'
import notification from './utils/notification.js';

window.$notification = notification;

createApp(App).use(store).use(router).mount('#app')
