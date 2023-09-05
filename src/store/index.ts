import { createStore, Store } from 'vuex';
import UserInfo from '../interfaces/UserInfo';

interface RootState {
	loggedInUserData: UserInfo | null;
}

const store = createStore<RootState>({
	state(): RootState {
		return {
			loggedInUserData: null,
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
		addUserAvatar(state: RootState, payload: string) {
			if (state.loggedInUserData) {
				state.loggedInUserData.user['avatar'] = payload;
			}
		},
	},
});

export default store as Store<RootState>;
