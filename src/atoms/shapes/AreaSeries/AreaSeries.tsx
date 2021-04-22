import React from 'react';
import { AnimatedAreaSeries, AreaSeries as StaticAreaSeries } from '@visx/xychart';
import { Accessors, Curve, Data } from 'src/types';
import { XYChartProps } from 'src/XYChart/types';

interface Props {
  accessors: Accessors;
  curve: Curve;
  data: Data;
  isAnimated: XYChartProps['isAnimated'];
}

const AreaSeries: React.FC<Props> = ({
  accessors,
  curve,
  data,
  isAnimated,
}) => {
  const VisxAreaSeries = isAnimated ? AnimatedAreaSeries : StaticAreaSeries;

  return (
    <>
      <VisxAreaSeries
        dataKey="Austin"
        data={data}
        xAccessor={accessors.x.Austin}
        yAccessor={accessors.y.Austin}
        fillOpacity={0.4}
        curve={curve}
      />
      <VisxAreaSeries
        dataKey="New York"
        data={data}
        xAccessor={accessors.x['New York']}
        yAccessor={accessors.y['New York']}
        fillOpacity={0.4}
        curve={curve}
      />
      <VisxAreaSeries
        dataKey="San Francisco"
        data={data}
        xAccessor={accessors.x['San Francisco']}
        yAccessor={accessors.y['San Francisco']}
        fillOpacity={0.4}
        curve={curve}
      />
    </>
  );
}

export default AreaSeries;
