import { useMemo } from 'react';
import { CityTemperature, KeyAccessors } from 'src/types';
import { XYChartConfig, XYChartProps } from './types';

interface Props {
  hasNegativeValues: XYChartProps['hasNegativeValues'];
  renderHorizontally: XYChartConfig['renderHorizontally'];
}

interface Return {
  x: KeyAccessors,
  y: KeyAccessors,
}

export default ({ hasNegativeValues, renderHorizontally }: Props): Return => {
  const getSfTemperature = (datum: CityTemperature) => Number(datum['San Francisco']);
  const getNegativeSfTemperature = (datum: CityTemperature) => -getSfTemperature(datum);
  const getNyTemperature = (datum: CityTemperature) => Number(datum['New York']);
  const getAustinTemperature = (datum: CityTemperature) => Number(datum.Austin);
  const getDate = (datum: CityTemperature) => datum.date;

  return useMemo(
    () => ({
      x: {
        Austin: renderHorizontally ? getAustinTemperature : getDate,
        'New York': renderHorizontally ? getNyTemperature : getDate,
        'San Francisco': renderHorizontally
          ? hasNegativeValues
            ? getNegativeSfTemperature
            : getSfTemperature
          : getDate,
      },
      y: {
        Austin: renderHorizontally ? getDate : getAustinTemperature,
        'New York': renderHorizontally ? getDate : getNyTemperature,
        'San Francisco': renderHorizontally
          ? getDate
          : hasNegativeValues
            ? getNegativeSfTemperature
            : getSfTemperature,
      },
      date: getDate,
    }),
    [hasNegativeValues, renderHorizontally],
  );
};
