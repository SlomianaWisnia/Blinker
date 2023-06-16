import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PageNotFound from '../views/PageNotFound.vue';
import AuthView from '../views/AuthView.vue';
import HomeLayout from '../layouts/HomeLayout.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: HomeLayout,
		children: [
			{
				path: '',
				name: 'mainHome',
				component: HomeView,
			},
		],
	},
	{
		path: '/auth',
		name: 'auth',
		component: AuthView,
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
