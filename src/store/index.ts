import { createStore } from 'vuex';
import UserInfo from '../interfaces/UserInfo';

const store = createStore({
	state() {
		return {
			user_info: [],
		};
	},
	mutations: {
		addUserInfo(state: any, payload: UserInfo) {
			state.user_info = payload;
		},
	},
});

export default store;
