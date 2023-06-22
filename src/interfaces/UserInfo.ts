interface friends {
	username: string;
	avatar?: string;
}

export default interface UserInfo {
	user: object;
	friends: Array<friends>;
}
