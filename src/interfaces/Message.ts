export default interface Messages {
	createdAt: string;
	from: {
		avatarHex: string;
		username: string;
	};
	message: string;
}
