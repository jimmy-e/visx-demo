import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { CurveFactory } from 'd3-shape';
import { curveLinear, curveStep, curveCardinal } from '@visx/curve';
import { lightTheme, darkTheme, XYChartTheme } from '@visx/xychart';
import { XYChartProps } from './types';
import customTheme from './customTheme';

export const getCurve = (curveType: XYChartProps['curveType']): CurveFactory => {
  switch (curveType) {
    case 'cardinal':
      return curveCardinal;
    case 'step':
      return curveStep;
    default:
      return curveLinear;
  }
};

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

export const getTheme = (themeType: XYChartProps['themeType']): XYChartTheme => {
  switch (themeType) {
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
