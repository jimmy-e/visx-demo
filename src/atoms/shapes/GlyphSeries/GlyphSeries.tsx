import React from 'react';
import { AnimatedGlyphSeries, GlyphSeries as StaticGlyphSeries } from '@visx/xychart';
import { Accessors, Data, ColorAccessorFactory, RenderGlyph } from 'src/types';
import { XYChartConfig, XYChartProps } from 'src/XYChart/types';

interface Props {
  accessors: Accessors;
  colorAccessorFactory: ColorAccessorFactory;
  data: Data;
  glyphComponent: XYChartProps['glyphComponent'];
  isAnimated: XYChartProps['isAnimated'];
  renderGlyph: RenderGlyph;
  theme: XYChartConfig['theme'];
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
