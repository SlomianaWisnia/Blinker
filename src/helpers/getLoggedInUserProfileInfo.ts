import { useStore } from 'vuex';

export default () => {
	const store = useStore();

	const loggedInUser = store.state.loggedInUserData.user;

	return {
		avatar: loggedInUser.avatar,
		avatarHex: loggedInUser.avatarHex,
		username: loggedInUser.username,
	};
};
