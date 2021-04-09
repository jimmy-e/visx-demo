import React from 'react';
import { XYChartProps } from './types';
import {
  AnimatedBarSeries,
  AnimatedBarStack,
  BarSeries as StaticBarSeries,
  BarStack as StaticBarStack,
} from '@visx/xychart';

interface Props {
  accessors: XYChartProps['accessors'];
  data: XYChartProps['data'];
  isAnimated: XYChartProps['isAnimated'];
  stackOffset: XYChartProps['stackOffset'];
}

const BarStack: React.FC<Props> = ({
  accessors,
  data,
  isAnimated,
  stackOffset,
}) => {
  const VisxBarSeries = isAnimated ? AnimatedBarSeries : StaticBarSeries;
  const VisxBarStack = isAnimated ? AnimatedBarStack : StaticBarStack;

  return (
    <VisxBarStack offset={stackOffset}>
      <VisxBarSeries
        dataKey="New York"
        data={data}
        xAccessor={accessors.x['New York']}
        yAccessor={accessors.y['New York']}
      />
      <VisxBarSeries
        dataKey="San Francisco"
        data={data}
        xAccessor={accessors.x['San Francisco']}
        yAccessor={accessors.y['San Francisco']}
      />
      <VisxBarSeries
        dataKey="Austin"
        data={data}
        xAccessor={accessors.x.Austin}
        yAccessor={accessors.y.Austin}
      />
    </VisxBarStack>
  );
}

export default BarStack;
