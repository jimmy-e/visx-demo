import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { lightTheme, darkTheme, XYChartTheme } from '@visx/xychart';
import { XYChartProps } from './types';
import customTheme from './customTheme';

export const getData = (
  hasFewerDatum: XYChartProps['hasFewerDatum'],
  hasMissingValues: XYChartProps['hasMissingValues'],
): CityTemperature[] => {
  const sampleData = cityTemperature.slice(225, 275);
  const dataMissingValues = sampleData.map((d, i) =>
    i === 10 || i === 11
      ? { ...d, 'San Francisco': 'nope', 'New York': 'notanumber', Austin: 'null' }
      : d,
  );
  const dataSmall = sampleData.slice(0, 15);
  const dataSmallMissingValues = dataMissingValues.slice(0, 15);

  if (hasFewerDatum) {
    return hasMissingValues ? dataSmallMissingValues : dataSmall;
  } else {
    return hasMissingValues ? dataMissingValues : sampleData;
  }
};

export const getTheme = (theme: XYChartProps['theme']): XYChartTheme => {
  switch (theme) {
    case 'custom':
      return customTheme;
    case 'dark':
      return darkTheme;
    case 'light':
      return lightTheme;
    default:
      throw Error('invalid theme type');
  }
}
