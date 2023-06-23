import User from './User';
interface Friend {
	username: string;
	avatar?: string;
}

export default interface UserInfo {
	user: User;
	friends: Array<Friend>;
}
