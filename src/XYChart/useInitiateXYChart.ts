import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { XYChartTheme } from '@visx/xychart';
import { XYChartProps } from './types';
import { getData, getTheme } from './utils';

interface Props {
  hasFewerDatum: XYChartProps['hasFewerDatum'];
  hasMissingValues: XYChartProps['hasMissingValues'];
}

interface Return {
  data: CityTemperature[];
  // theme: XYChartTheme;
}

export default ({
  hasFewerDatum,
  hasMissingValues
}: Props): Return => {
  const data = getData(hasFewerDatum, hasMissingValues);

  return {
    data
  };
};
