import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { XYChartTheme } from '@visx/xychart';
import { XYChartProps } from './types';
import { getData, getTheme } from './utils';

interface Props {
  hasFewerDatum: XYChartProps['hasFewerDatum'];
  hasMissingValues: XYChartProps['hasMissingValues'];
  orientation: XYChartProps['orientation'];
  themeType: XYChartProps['themeType'];
}

interface Return {
  data: CityTemperature[];
  renderHorizontally: boolean;
  theme: XYChartTheme;
}

// Gets XYChart configurations
export default ({
  hasFewerDatum,
  hasMissingValues,
  orientation,
  themeType,
}: Props): Return => {
  const data = getData(hasFewerDatum, hasMissingValues);
  const renderHorizontally = orientation === 'horizontal';
  const theme = getTheme(themeType);

  return {
    data,
    renderHorizontally,
    theme,
  };
};
