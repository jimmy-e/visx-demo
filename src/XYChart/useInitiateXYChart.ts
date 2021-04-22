import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { XYChartTheme } from '@visx/xychart';
import { XYChartProps } from './types';
import { getData, getTheme } from './utils';

interface Props {
  hasFewerDatum: XYChartProps['hasFewerDatum'];
  hasMissingValues: XYChartProps['hasMissingValues'];
  themeType: XYChartProps['themeType'];
}

interface Return {
  data: CityTemperature[];
  theme: XYChartTheme;
}

export default ({
  hasFewerDatum,
  hasMissingValues,
  themeType,
}: Props): Return => {
  const data = getData(hasFewerDatum, hasMissingValues);
  const theme = getTheme(themeType);

  return {
    data,
    theme,
  };
};
