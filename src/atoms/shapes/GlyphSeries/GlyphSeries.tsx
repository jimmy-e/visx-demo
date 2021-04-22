import React from 'react';
import { AnimatedGlyphSeries, GlyphSeries as StaticGlyphSeries } from '@visx/xychart';
import { Accessors, Data, ColorAccessorFactory, RenderGlyph } from 'src/types';
import { XYChartProps } from 'src/XYChart/types';

interface Props {
  accessors: Accessors;
  colorAccessorFactory: ColorAccessorFactory;
  data: Data;
  isAnimated: XYChartProps['isAnimated'];
  renderGlyph: RenderGlyph;
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
