import React from 'react';
import { AnimatedAreaSeries, AreaSeries as StaticAreaSeries } from '@visx/xychart';
import { Accessors, XYChartProps } from 'src/types';

interface Props {
  accessors: Accessors;
  curve: XYChartProps['curve'];
  data: XYChartProps['data'];
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
