import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import axios from 'axios';
import store from '../store';
import HomeView from '../views/HomeView.vue';
import PageNotFound from '../views/PageNotFound.vue';
import AuthView from '../views/AuthView.vue';
import HomeLayout from '../layouts/HomeLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import SettingsLayout from '../layouts/SettingsLayout.vue';
import SettingsView from '../views/settings/SettingsView.vue';
import ChatView from '../views/ChatView.vue';
import ChatLayout from '../layouts/ChatLayout.vue';

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
		path: '/chat',
		component: ChatLayout,
		meta: { requireAuth: true },
		children: [
			{
				path: '/chat/:userId',
				component: ChatView,
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
	{
		path: '/settings',
		component: SettingsLayout,
		meta: { requireAuth: true },
		children: [
			{
				name: 'settings',
				path: '',
				component: SettingsView,
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
