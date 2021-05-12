import { timeFormat, timeParse } from 'd3-time-format';

const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');

export const formatDate = (date: string) => format(parseDate(date) as Date);
