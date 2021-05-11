import React from 'react';
import {
  AnimatedBarSeries,
  AnimatedBarGroup,
  BarSeries as StaticBarSeries,
  BarGroup as StaticBarGroup,
} from '@visx/xychart';
import { Accessors, ColorAccessorFactory, Data, XYChartProps } from '../XYChart/types';

interface Props {
  accessors: Accessors;
  colorAccessorFactory: ColorAccessorFactory;
  data: Data;
  isAnimated: XYChartProps['isAnimated'];
}

const BarGroup: React.FC<Props> = ({
  accessors,
  colorAccessorFactory,
  data,
  isAnimated,
}) => {
  const VisxBarSeries = isAnimated ? AnimatedBarSeries : StaticBarSeries;
  const VisxBarGroup = isAnimated ? AnimatedBarGroup : StaticBarGroup;

  return (
    <VisxBarGroup>
      <VisxBarSeries
        dataKey="New York"
        data={data}
        xAccessor={accessors.x['New York']}
        yAccessor={accessors.y['New York']}
        colorAccessor={colorAccessorFactory('New York')}
      />
      <VisxBarSeries
        dataKey="San Francisco"
        data={data}
        xAccessor={accessors.x['San Francisco']}
        yAccessor={accessors.y['San Francisco']}
        colorAccessor={colorAccessorFactory('San Francisco')}
      />
      <VisxBarSeries
        dataKey="Austin"
        data={data}
        xAccessor={accessors.x.Austin}
        yAccessor={accessors.y.Austin}
        colorAccessor={colorAccessorFactory('Austin')}
      />
    </VisxBarGroup>
  );
}

export default BarGroup;
