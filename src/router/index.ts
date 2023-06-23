import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import axios from 'axios';
import HomeView from '../views/HomeView.vue';
import PageNotFound from '../views/PageNotFound.vue';
import AuthView from '../views/AuthView.vue';
import HomeLayout from '../layouts/HomeLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import store from '../store';

let isAuthorized = false;

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: HomeLayout,
		meta: { requireAuth: true },
		children: [
			{
				name: 'home',
				path: '',
				component: HomeView,
			},
			{
				path: '/:catchAll(.*)',
				name: 'NotFound',
				component: PageNotFound,
			},
		],
	},
	{
		path: '/auth',
		component: AuthLayout,
		children: [
			{
				name: 'auth',
				meta: { redirectLoggedIn: true },
				path: '',
				component: AuthView,
			},
		],
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach((to, _from, next) => {
	if (to.matched.some((record) => record.meta.requireAuth) && !isAuthorized) {
		axios
			.post('/auth-verify')
			.then((res) => {
				store.commit('addUserInfo', res.data.data);
				next();
				isAuthorized = store.getters.dataIsDownloaded;
			})
			.catch(() => {
				next({ name: 'auth' });
			});
	} else if (to.meta.redirectLoggedIn) {
		axios
			.post('/auth-verify')
			.then(() => next('/'))
			.catch(() => next());
	} else {
		next();
	}
});

export default router;
