interface Friend {
	username: string;
	avatar?: string;
}

export default interface UserInfo {
	user: {
		avatar?: string;
		avatarHex?: string;
		avatarPreview?: string;
		username: string;
		email: string;
	};
	friends: Array<Friend>;
}
