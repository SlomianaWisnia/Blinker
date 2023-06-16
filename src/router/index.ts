import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PageNotFound from '../views/PageNotFound.vue';
import AuthView from '../views/AuthView.vue';
import HomeLayout from '../layouts/HomeLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: HomeLayout,
		children: [
			{
				name: 'home',
				path: '',
				component: HomeView,
			},
		],
	},
	{
		path: '/auth',
		component: AuthLayout,
		children: [
			{
				name: 'auth',
				path: '',
				component: AuthView,
			},
		],
	},
	{
		path: '/:catchAll(.*)',
		name: 'NotFound',
		component: PageNotFound,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
