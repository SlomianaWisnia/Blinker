import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PageNotFound from '../views/PageNotFound.vue';
import AuthView from '../views/AuthView.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/:catchAll(.*)',
		name: 'NotFound',
		component: PageNotFound,
	},
	{
		path: '/auth',
		name: 'auth',
		component: AuthView,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
