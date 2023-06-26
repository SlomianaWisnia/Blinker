export default interface Chatrooms {
	friend: {
		username: string;
		avatar?: string;
	};
	last_message: {
		_id: string;
		created: string;
		message: string;
		from: {
			avatar?: string;
			username: string;
		};
	};
}
