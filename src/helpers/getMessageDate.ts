import moment from 'moment';

export default (dateString: any): any => {
	const currentDate = moment();
	const givenDate = moment(dateString);

	if (currentDate.diff(givenDate, 'minutes') < 5) {
		return 'now';
	}

	if (currentDate.isSame(givenDate, 'day')) {
		return 'Today';
	}

	if (
		currentDate.diff(givenDate, 'days') < 6 &&
		currentDate.week() === givenDate.week()
	) {
		return givenDate.format('ddd');
	}

	return givenDate.format('DD-MM');
};
