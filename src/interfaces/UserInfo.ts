interface Friend {
	username: string;
	avatar?: string;
}

export default interface UserInfo {
	user: {
		avatar?: string;
		username: string;
		email: string;
	};
	friends: Array<Friend>;
}
