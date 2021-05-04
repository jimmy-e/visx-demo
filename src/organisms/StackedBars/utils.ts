import { timeFormat, timeParse } from 'd3-time-format';
import { Data, Datum } from 'organisms/XYChart/types';
import { Keys } from './types';

const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');

export const formatDate = (date: string) => format(parseDate(date) as Date);
export const getDate = (datum: Datum) => datum.date;

// ToDo: memo this fn
export const getKeys = (data: Data): Keys => (
  Object.keys(data[0]).filter(key => key !== 'date') as Keys
);
