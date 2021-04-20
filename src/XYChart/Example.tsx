import React, {useCallback, useMemo} from 'react';
import { AnimationTrajectory } from '@visx/react-spring/lib/types';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { GlyphCross, GlyphDot, GlyphStar } from '@visx/glyph';
import { GlyphProps } from '@visx/xychart/lib/types';
import { curveLinear, curveStep, curveCardinal } from '@visx/curve';
import Annotation from 'tools/Annotation/Annotation';
import AreaSeries from 'shapes/AreaSeries/AreaSeries';
import AreaStack from 'shapes/AreaStack/AreaStack';
import Axis from 'tools/Axis/Axis';
import BarGroup from 'shapes/BarGroup/BarGroup';
import BarSeries from 'shapes/BarSeries/BarSeries';
import BarStack from 'shapes/BarStack/BarStack';
import GlyphSeries from 'shapes/GlyphSeries/GlyphSeries';
import Grid from 'tools/Grid/Grid';
import LineSeries from 'shapes/LineSeries/LineSeries';
import Tooltip from 'tools/Tooltip/Tooltip';
import XYChart from 'molecules/XYChart/XYChart';
import { XYChartProps } from 'src/types';
import CustomChartBackground from './CustomChartBackground';
import CustomTooltip from './CustomTooltip';

const dateScaleConfig = { type: 'band', paddingInner: 0.3 };
const temperatureScaleConfig = { type: 'linear' };

const Example: React.FC<XYChartProps> = (props) => {
  const {
    accessors,
    annotationDataKey,
    annotationDatum,
    annotationType,
    // @ts-expect-error: will fix type bindings
    barType,
    colorAccessorFactory,
    // @ts-expect-error: will fix type bindings
    curveType,
    data,
    editAnnotationLabelPosition,
    height,
    // @ts-expect-error: will fix type bindings
    glyphComponent,
    isAnimated,
    numTicks,
    renderAreaSeries,
    renderAreaStack,
    renderHorizontally,
    renderLineSeries,
    setAnnotationDataIndex,
    setAnnotationDataKey,
    // @ts-expect-error: will fix type bindings
    hasSharedTooltip,
    showGridColumns,
    showGridRows,
    showHorizontalCrosshair,
    showTooltip,
    showVerticalCrosshair,
    snapTooltipToDatumX,
    snapTooltipToDatumY,
    stackOffset,
    width,
    theme,
    xAxisOrientation,
    yAxisOrientation,
  } = props;

  const curve = (curveType === 'cardinal' && curveCardinal)
    || (curveType === 'step' && curveStep)
    || curveLinear;

  const config = useMemo(
    () => ({
      x: renderHorizontally ? temperatureScaleConfig : dateScaleConfig,
      y: renderHorizontally ? dateScaleConfig : temperatureScaleConfig,
    }),
    [renderHorizontally],
  );

  const glyphOutline = theme.gridStyles.stroke;
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

  const animationTrajectory: AnimationTrajectory = 'center';

  const finalBarType = barType;

  const renderBarGroup = finalBarType === 'group';
  const renderBarSeries = finalBarType === 'default';
  const renderBarStack = finalBarType === 'stack';

  return (
    <XYChart
      theme={theme}
      xScale={config.x}
      yScale={config.y}
      height={Math.min(400, height)}
      captureEvents={!editAnnotationLabelPosition}
      onPointerUp={d => {
        setAnnotationDataKey(d.key as 'New York' | 'San Francisco' | 'Austin');
        setAnnotationDataIndex(d.index);
      }}
    >
      <CustomChartBackground />
      <Grid
        key={`grid-${animationTrajectory}`} // force animate on update
        rows={showGridRows}
        columns={showGridColumns}
        animationTrajectory={animationTrajectory}
        numTicks={numTicks}
      />
      {renderBarStack && (
        <BarStack
          accessors={accessors}
          data={data}
          isAnimated={isAnimated}
          stackOffset={stackOffset}
        />
      )}
      {renderBarGroup && (
        <BarGroup
          accessors={accessors}
          colorAccessorFactory={colorAccessorFactory}
          data={data}
          isAnimated={isAnimated}
        />
      )}
      {renderBarSeries && (
        <BarSeries
          accessors={accessors}
          colorAccessorFactory={colorAccessorFactory}
          data={data}
          isAnimated={isAnimated}
        />
      )}
      {renderAreaSeries && (
        <AreaSeries
          accessors={accessors}
          curve={curve}
          data={data}
          isAnimated={isAnimated}
        />
      )}
      {renderAreaStack && (
        <AreaStack
          accessors={accessors}
          curve={curve}
          data={data}
          isAnimated={isAnimated}
          stackOffset={stackOffset}
        />
      )}
      {renderLineSeries && (
        <LineSeries
          accessors={accessors}
          curve={curve}
          data={data}
          isAnimated={isAnimated}
          renderBarSeries={renderBarSeries}
        />
      )}
      {glyphComponent && (
        <GlyphSeries
          accessors={accessors}
          colorAccessorFactory={colorAccessorFactory}
          data={data}
          isAnimated={isAnimated}
          renderGlyph={renderGlyph}
        />
      )}
      <Axis
        key={`time-axis-${animationTrajectory}-${renderHorizontally}`}
        animationTrajectory={animationTrajectory}
        isAnimated={isAnimated}
        numTicks={numTicks}
        orientation={renderHorizontally ? yAxisOrientation : xAxisOrientation}
      />
      <Axis
        key={`temp-axis-${animationTrajectory}-${renderHorizontally}`}
        animationTrajectory={animationTrajectory}
        isAnimated={isAnimated}
        label={
          stackOffset == null
            ? 'Temperature (°F)'
            : stackOffset === 'expand'
            ? 'Fraction of total temperature'
            : ''
        }
        numTicks={numTicks}
        orientation={renderHorizontally ? xAxisOrientation : yAxisOrientation}
        // values don't make sense in stream graph
        tickFormat={stackOffset === 'wiggle' ? () => '' : undefined}
      />
      {annotationDataKey && annotationDatum && (
        <Annotation
          annotationType={annotationType}
          canEditSubject={false}
          dataKey={annotationDataKey}
          datum={annotationDatum}
          editable={editAnnotationLabelPosition}
          isAnimated={isAnimated}
          stroke={theme.gridStyles.stroke}
          subtitle={`${annotationDatum.date}, ${annotationDatum[annotationDataKey]}°F`}
          title={annotationDataKey}
        />
      )}
      {
        showTooltip && (
          <Tooltip
            showDatumGlyph={(snapTooltipToDatumX || snapTooltipToDatumY) && !renderBarGroup}
            showHorizontalCrosshair={showHorizontalCrosshair}
            showSeriesGlyphs={hasSharedTooltip && !renderBarGroup}
            showVerticalCrosshair={showVerticalCrosshair}
            snapTooltipToDatumX={snapTooltipToDatumX}
            snapTooltipToDatumY={snapTooltipToDatumY}
            renderTooltip={({ tooltipData, colorScale }) => (
              <CustomTooltip
                accessors={accessors}
                colorScale={colorScale}
                hasSharedTooltip={hasSharedTooltip}
                renderHorizontally={renderHorizontally}
                tooltipData={tooltipData}
              />
            )}
          />
        )
      }
    </XYChart>
  );
}

export default Example;
