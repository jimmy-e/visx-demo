import { useMemo } from 'react';
import { Datum, KeyAccessors, XYChartConfig, XYChartProps } from 'organisms/XYChart/types';

interface Props {
  hasNegativeValues: XYChartProps['hasNegativeValues'];
  renderHorizontally: XYChartConfig['renderHorizontally'];
}

interface Return {
  x: KeyAccessors,
  y: KeyAccessors,
}

export default ({ hasNegativeValues, renderHorizontally }: Props): Return => {
  const getSfTemperature = (datum: Datum) => Number(datum['San Francisco']);
  const getNegativeSfTemperature = (datum: Datum) => -getSfTemperature(datum);
  const getNyTemperature = (datum: Datum) => Number(datum['New York']);
  const getAustinTemperature = (datum: Datum) => Number(datum.Austin);
  const getDate = (datum: Datum) => datum.date;

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
