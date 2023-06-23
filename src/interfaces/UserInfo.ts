import User from './User';
import Friend from './Friend';

export default interface UserInfo {
	user: User;
	friends: Array<Friend>;
}
