import { timeFormat, timeParse } from 'd3-time-format';
import { Datum } from 'src/types';

const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');

export const formatDate = (date: string) => format(parseDate(date) as Date);
export const getDate = (datum: Datum) => datum.date;
