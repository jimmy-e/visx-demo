import React from 'react';
import { XYChartProps } from './types';

interface Props {
  BarSeries: XYChartProps['BarSeries'];
  BarStack: XYChartProps['BarStack'];
  accessors: XYChartProps['accessors'];
  data: XYChartProps['data'];
  stackOffset: XYChartProps['stackOffset'];
}

const BarStack: React.FC<Props> = ({
  BarSeries,
  BarStack,
  accessors,
  data,
  stackOffset,
}) => {
  return (
    <BarStack offset={stackOffset}>
      <BarSeries
        dataKey="New York"
        data={data}
        xAccessor={accessors.x['New York']}
        yAccessor={accessors.y['New York']}
      />
      <BarSeries
        dataKey="San Francisco"
        data={data}
        xAccessor={accessors.x['San Francisco']}
        yAccessor={accessors.y['San Francisco']}
      />
      <BarSeries
        dataKey="Austin"
        data={data}
        xAccessor={accessors.x.Austin}
        yAccessor={accessors.y.Austin}
      />
    </BarStack>
  );
}

export default BarStack;
