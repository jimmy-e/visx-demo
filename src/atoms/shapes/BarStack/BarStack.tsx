import React from 'react';
import {
  AnimatedBarSeries,
  AnimatedBarStack,
  BarSeries as StaticBarSeries,
  BarStack as StaticBarStack,
} from '@visx/xychart';
import { Accessors, Data, IsAnimated, Offset } from 'src/types';

interface Props {
  accessors: Accessors;
  data: Data;
  isAnimated?: IsAnimated;
  offset: Offset;
}

const BarStack: React.FC<Props> = ({
  accessors,
  data,
  isAnimated,
  offset,
}) => {
  const VisxBarSeries = isAnimated ? AnimatedBarSeries : StaticBarSeries;
  const VisxBarStack = isAnimated ? AnimatedBarStack : StaticBarStack;

  return (
    <VisxBarStack offset={offset}>
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
