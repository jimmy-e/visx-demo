import React, { useCallback } from 'react';
import { Accessors, Data, ColorAccessorFactory } from 'src/types';
import { AnimatedGlyphSeries, GlyphSeries as StaticGlyphSeries } from '@visx/xychart';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { GlyphCross, GlyphDot, GlyphStar } from '@visx/glyph';
import { GlyphProps } from '@visx/xychart/lib/types';
import { XYChartConfig, XYChartProps } from 'src/XYChart/types';

interface Props {
  accessors: Accessors;
  colorAccessorFactory: ColorAccessorFactory;
  data: Data;
  glyphComponent: XYChartProps['glyphComponent'];
  isAnimated: XYChartProps['isAnimated'];
  theme: XYChartConfig['theme'];
}

const GlyphSeries: React.FC<Props> = ({
  accessors,
  colorAccessorFactory,
  data,
  glyphComponent,
  isAnimated,
  theme,
}) => {
  const VisxGlyphSeries = isAnimated ? AnimatedGlyphSeries : StaticGlyphSeries;

  const glyphOutline = theme.gridStyles.stroke as string;

  const renderGlyph = useCallback(
    ({ size, color, onPointerMove, onPointerOut, onPointerUp }: GlyphProps<CityTemperature>) => {
      const handlers = { onPointerMove, onPointerOut, onPointerUp };
      if (glyphComponent === 'star') {
        return <GlyphStar stroke={glyphOutline} fill={color} size={size * 10} {...handlers} />;
      }
      if (glyphComponent === 'circle') {
        return <GlyphDot stroke={glyphOutline} fill={color} r={size / 2} {...handlers} />;
      }
      if (glyphComponent === 'cross') {
        return <GlyphCross stroke={glyphOutline} fill={color} size={size * 10} {...handlers} />;
      }
      return (
        <text dx="-0.75em" dy="0.25em" fontSize={14} {...handlers}>
          🍍
        </text>
      );
    },
    [glyphComponent, glyphOutline],
  );

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
