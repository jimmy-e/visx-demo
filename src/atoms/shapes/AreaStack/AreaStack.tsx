import React from 'react';
import {
  AnimatedAreaSeries,
  AnimatedAreaStack,
  AreaSeries as StaticAreaSeries,
  AreaStack as StaticAreaStack,
} from '@visx/xychart';
import { Accessors, Curve, Data, XYChartProps } from 'organisms/XYChart/types';

interface Props {
  accessors: Accessors;
  curve: Curve;
  data: Data;
  isAnimated: XYChartProps['isAnimated'];
  stackOffset: XYChartProps['stackOffset'];
}

const AreaStack: React.FC<Props> = ({
  accessors,
  curve,
  data,
  isAnimated,
  stackOffset,
}) => {
  const VisxAreaSeries = isAnimated ? AnimatedAreaSeries : StaticAreaSeries;
  const VisxAreaStack = isAnimated ? AnimatedAreaStack : StaticAreaStack;

  return (
    <VisxAreaStack curve={curve} offset={stackOffset} renderLine={stackOffset !== 'wiggle'}>
      <VisxAreaSeries
        dataKey="Austin"
        data={data}
        xAccessor={accessors.x.Austin}
        yAccessor={accessors.y.Austin}
        fillOpacity={0.4}
      />
      <VisxAreaSeries
        dataKey="New York"
        data={data}
        xAccessor={accessors.x['New York']}
        yAccessor={accessors.y['New York']}
        fillOpacity={0.4}
      />
      <VisxAreaSeries
        dataKey="San Francisco"
        data={data}
        xAccessor={accessors.x['San Francisco']}
        yAccessor={accessors.y['San Francisco']}
        fillOpacity={0.4}
      />
    </VisxAreaStack>
  );
}

export default AreaStack;
