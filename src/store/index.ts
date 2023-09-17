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
		changeUserAvatar(state: RootState, payload: string) {
			if (state.loggedInUserData) {
				state.loggedInUserData.user['avatar'] = payload;
			}
		},
		changeUsername(state: RootState, payload: string) {
			if (state.loggedInUserData) {
				state.loggedInUserData.user['username'] = payload;
			}
		},
	},
});

export default store as Store<RootState>;
