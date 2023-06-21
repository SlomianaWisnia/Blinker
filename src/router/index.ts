import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import axios from 'axios';
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
				meta: { auth: true },
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

router.beforeEach((to, from, next) => {
	if (to.meta.auth) {
		axios
			.post('/auth-verify')
			.then(() => next())
			.catch(() => next({ name: 'auth' }));
	} else {
		next();
	}
});

export default router;

// on mounted auth check,
