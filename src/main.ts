import { createApp } from 'vue';
import { plugin, defaultConfig } from '@formkit/vue';
import './assets/scss/reset.scss';
import App from './App.vue';
import router from './router';

createApp(App).use(plugin, defaultConfig).use(router).mount('#app');
