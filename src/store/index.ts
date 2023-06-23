import { createStore, Store } from 'vuex';
import UserInfo from '../interfaces/UserInfo';

interface RootState {
	user_info: UserInfo | [];
}

const store = createStore<RootState>({
	state(): RootState {
		return {
			user_info: [],
		};
	},
	mutations: {
		addUserInfo(state: RootState, payload: UserInfo) {
			state.user_info = payload;
		},
	},
});

export default store as Store<RootState>;
