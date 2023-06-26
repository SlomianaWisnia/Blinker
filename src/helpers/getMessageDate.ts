import moment from 'moment';

export default (dateString: any): any => {
	const currentDate = moment();
	const givenDate = moment(dateString);

	if (currentDate.diff(givenDate, 'days') === 1) {
		return 'Yesterday';
	}

	if (currentDate.diff(givenDate, 'days') < 6) {
		return givenDate.format('ddd');
	}

	if (currentDate.diff(givenDate, 'minutes') < 5) {
		return 'NOW';
	}

	return givenDate.format('DD-MM');
};
