import { Accessor, Datum, KeyAccessors } from 'src/types';

interface Return {
  x: KeyAccessors,
  y: KeyAccessors,
  date: Accessor,
}

export default (): Return => {
  const getSfTemperature = (datum: Datum) => Number(datum['San Francisco']);
  const getNyTemperature = (datum: Datum) => Number(datum['New York']);
  const getAustinTemperature = (datum: Datum) => Number(datum.Austin);
  const getDate = (datum: Datum) => datum.date;

  return {
    x: {
      Austin: getAustinTemperature,
      'New York': getNyTemperature,
      'San Francisco': getSfTemperature,
    },
    y: {
      Austin: getDate,
      'New York': getDate,
      'San Francisco': getDate,
    },
    date: getDate,
  };
};
