export default interface Chatrooms {
	_id: string;
	members: [
		{
			username: string;
			avatar?: string;
		}
	];
	messages: [
		{
			_id: string;
			created: string;
			message: string;
			from: {
				avatar?: string;
				username: string;
			};
		}
	];
}
