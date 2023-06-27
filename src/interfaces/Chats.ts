export default interface Chats {
	id: string;
	friend: {
		username: string;
		avatar?: string | undefined;
	};
	last_message: {
		_id: string;
		created: string;
		message: string;
		from: {
			avatar?: string | undefined;
			username: string;
		};
	};
}
