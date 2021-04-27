import cityTemperatures from '__fixtures__/cityTemperatures';
import { CurveFactory } from 'd3-shape';
import { curveLinear, curveStep, curveCardinal } from '@visx/curve';
import { lightTheme, darkTheme, XYChartTheme } from '@visx/xychart';
import { Data } from 'src/types';
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
): Data => {
  const sampleData = cityTemperatures;
  const dataMissingValues = sampleData.map((datum, index) =>
    index === 10 || index === 11
      ? { ...datum, 'San Francisco': 'nope', 'New York': 'notanumber', Austin: 'null' }
      : datum,
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
