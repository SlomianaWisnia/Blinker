export default interface Chats {
	id: string;
	friend?: {
		username: string;
		avatar?: string | undefined;
		avatarHex?: string | undefined;
	};
	last_message: {
		_id: string;
		createdAt: Date;
		message: string;
		from: {
			avatar?: string | undefined;
			username: string;
		};
	};
}
