import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { timeFormat, timeParse } from 'd3-time-format';
import { CityName, Keys } from './types';

const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');

export const formatDate = (date: string) => format(parseDate(date) as Date);
export const getDate = (datum: CityTemperature) => datum.date;

// ToDo: memo this fn
export const getKeys = (data: CityTemperature[]): Keys => (
  Object.keys(data[0]).filter(key => key !== 'date') as Keys
);
