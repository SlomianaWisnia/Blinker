import { createApp } from 'vue';
import { plugin, defaultConfig } from '@formkit/vue';
import axios from 'axios';
import './assets/scss/reset.scss';
import App from './App.vue';
import router from './router';

axios.defaults.baseURL = 'http://localhost:3002/api';
axios.defaults.withCredentials = true;

createApp(App).use(plugin, defaultConfig).use(router).mount('#app');
