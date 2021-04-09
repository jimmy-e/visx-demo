import React from 'react';
import { AnimatedBarSeries, BarSeries as StaticBarSeries } from '@visx/xychart';
import { XYChartProps } from 'src/types';

interface Props {
  accessors: XYChartProps['accessors'];
  colorAccessorFactory: XYChartProps['colorAccessorFactory'];
  data: XYChartProps['data'];
  isAnimated: XYChartProps['isAnimated'];
}

const BarSeries: React.FC<Props> = ({
  accessors,
  colorAccessorFactory,
  data,
  isAnimated,
}) => {
  const VisxBarSeries = isAnimated ? AnimatedBarSeries : StaticBarSeries;

  return (
    <VisxBarSeries
      dataKey="New York"
      data={data}
      xAccessor={accessors.x['New York']}
      yAccessor={accessors.y['New York']}
      colorAccessor={colorAccessorFactory('New York')}
    />
  );
}

export default BarSeries;
