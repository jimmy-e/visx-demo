import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { CurveFactory } from 'd3-shape';
import { XYChartTheme } from '@visx/xychart';
import { XYChartProps } from './types';
import { getCurve, getData, getTheme } from './utils';

interface Props {
  curveType: XYChartProps['curveType'];
  hasFewerDatum: XYChartProps['hasFewerDatum'];
  hasMissingValues: XYChartProps['hasMissingValues'];
  orientation: XYChartProps['orientation'];
  themeType: XYChartProps['themeType'];
}

interface Return {
  curve: CurveFactory;
  data: CityTemperature[];
  renderHorizontally: boolean;
  theme: XYChartTheme;
}

// Gets XYChart configurations
export default ({
  curveType,
  hasFewerDatum,
  hasMissingValues,
  orientation,
  themeType,
}: Props): Return => {
  const curve = getCurve(curveType);
  const data = getData(hasFewerDatum, hasMissingValues);
  const renderHorizontally = orientation === 'horizontal';
  const theme = getTheme(themeType);

  return {
    curve,
    data,
    renderHorizontally,
    theme,
  };
};
