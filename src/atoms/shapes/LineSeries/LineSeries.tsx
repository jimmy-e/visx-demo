import React from 'react';
import { AnimatedLineSeries, LineSeries as StaticLineSeries } from '@visx/xychart';
import { XYChartProps } from 'src/types';

interface Props {
  accessors: XYChartProps['accessors'];
  curve: XYChartProps['curve'];
  data: XYChartProps['data'];
  isAnimated: XYChartProps['isAnimated'];
  renderBarSeries: XYChartProps['renderBarSeries'];
}

const LineSeries: React.FC<Props> = ({
  accessors,
  curve,
  data,
  isAnimated,
  renderBarSeries,
}) => {
  const VisxLineSeries = isAnimated ? AnimatedLineSeries : StaticLineSeries;

  return (
    <>
      <VisxLineSeries
        dataKey="Austin"
        data={data}
        xAccessor={accessors.x.Austin}
        yAccessor={accessors.y.Austin}
        curve={curve}
      />
      {!renderBarSeries && (
        <VisxLineSeries
          dataKey="New York"
          data={data}
          xAccessor={accessors.x['New York']}
          yAccessor={accessors.y['New York']}
          curve={curve}
        />
      )}
      <VisxLineSeries
        dataKey="San Francisco"
        data={data}
        xAccessor={accessors.x['San Francisco']}
        yAccessor={accessors.y['San Francisco']}
        curve={curve}
      />
    </>
  );
}

export default LineSeries;
