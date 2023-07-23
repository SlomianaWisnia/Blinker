import { createStore, Store } from 'vuex';
import UserInfo from '../interfaces/UserInfo';

interface RootState {
	loggedInUserData: UserInfo | [];
}

const store = createStore<RootState>({
	state(): RootState {
		return {
			loggedInUserData: [],
		};
	},
	getters: {
		dataIsDownloaded(state: RootState) {
			return !!state.loggedInUserData;
		},
	},
	mutations: {
		addUserInfo(state: RootState, payload: UserInfo) {
			state.loggedInUserData = payload;
		},
	},
});

export default store as Store<RootState>;
