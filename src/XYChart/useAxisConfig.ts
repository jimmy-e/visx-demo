import { useMemo } from 'react';
import { XYChartConfig } from './types';

interface Return {
  x: {
    type: string;
  };
  y: {
    type: string;
  };
}

const dateScaleConfig = { type: 'band', paddingInner: 0.3 };
const temperatureScaleConfig = { type: 'linear' };

export default (renderHorizontally: XYChartConfig['renderHorizontally']): Return => {
  return useMemo(
    () => ({
      x: renderHorizontally ? temperatureScaleConfig : dateScaleConfig,
      y: renderHorizontally ? dateScaleConfig : temperatureScaleConfig,
    }),
    [renderHorizontally],
  );
}
