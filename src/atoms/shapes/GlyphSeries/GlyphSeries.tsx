import React from 'react';
import { AnimatedGlyphSeries, GlyphSeries as StaticGlyphSeries } from '@visx/xychart';
import { XYChartProps } from 'src/types';

interface Props {
  accessors: XYChartProps['accessors'];
  colorAccessorFactory: XYChartProps['colorAccessorFactory'];
  data: XYChartProps['data'];
  isAnimated: XYChartProps['isAnimated'];
  renderGlyph: XYChartProps['renderGlyph'];
}

const GlyphSeries: React.FC<Props> = ({
  accessors,
  colorAccessorFactory,
  data,
  isAnimated,
  renderGlyph,
}) => {
  const VisxGlyphSeries = isAnimated ? AnimatedGlyphSeries : StaticGlyphSeries;

  return (
    <VisxGlyphSeries
      dataKey="San Francisco"
      colorAccessor={colorAccessorFactory('San Francisco')}
      data={data}
      renderGlyph={renderGlyph}
      xAccessor={accessors.x['San Francisco']}
      yAccessor={accessors.y['San Francisco']}
    />
  );
}

export default GlyphSeries;
