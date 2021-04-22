import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cityTemperature from '@visx/mock-data/lib/mocks/cityTemperature';
import { AnimationTrajectory } from '@visx/react-spring/lib/types';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { GlyphCross, GlyphDot, GlyphStar } from '@visx/glyph';
import { GlyphProps } from '@visx/xychart/lib/types';
import { PatternLines } from '@visx/pattern';
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
import { DataKey, XYChartProps } from 'src/types';
import CustomChartBackground from './CustomChartBackground';
import CustomTooltip from './CustomTooltip';
import { getTheme } from './utils';

const sampleData = cityTemperature.slice(225, 275);
const dataMissingValues = sampleData.map((d, i) =>
  i === 10 || i === 11
    ? { ...d, 'San Francisco': 'nope', 'New York': 'notanumber', Austin: 'null' }
    : d,
);
const dataSmall = sampleData.slice(0, 15);
const dataSmallMissingValues = dataMissingValues.slice(0, 15);

const dateScaleConfig = { type: 'band', paddingInner: 0.3 };
const temperatureScaleConfig = { type: 'linear' };
const getSfTemperature = (d: CityTemperature) => Number(d['San Francisco']);
const getNegativeSfTemperature = (d: CityTemperature) => -getSfTemperature(d);
const getNyTemperature = (d: CityTemperature) => Number(d['New York']);
const getAustinTemperature = (d: CityTemperature) => Number(d.Austin);
const getDate = (d: CityTemperature) => d.date;

const defaultAnnotationDataIndex = 13;

const Example: React.FC<XYChartProps> = (props) => {
  const {
    // @ts-expect-error: will fix type bindings
    annotationKey,
    annotationType,
    // @ts-expect-error: will fix type bindings
    barType,
    // @ts-expect-error: will fix type bindings
    curveType,
    editAnnotationLabelPosition,
    // @ts-expect-error: will fix type bindings
    glyphComponent,
    // @ts-expect-error: will fix type bindings
    hasFewerDatum,
    // @ts-expect-error: will fix type bindings
    hasMissingValues,
    // @ts-expect-error: will fix type bindings
    hasNegativeValues,
    // @ts-expect-error: will fix type bindings
    hasSharedTooltip,
    height,
    isAnimated,
    // @ts-expect-error: will fix type bindings
    lineType,
    numTicks,
    // @ts-expect-error: will fix type bindings
    orientation,
    // @ts-expect-error: will fix type bindings
    selectedDatumPatternId,
    // setAnnotationDataKey,
    showGridColumns,
    showGridRows,
    showHorizontalCrosshair,
    showTooltip,
    showVerticalCrosshair,
    snapTooltipToDatumX,
    snapTooltipToDatumY,
    stackOffset,
    theme: themeType,
    width,
    xAxisOrientation,
    yAxisOrientation,
  } = props;

  const data = hasFewerDatum
    ? hasMissingValues
      ? dataSmallMissingValues
      : dataSmall
    : hasMissingValues
      ? dataMissingValues
      : sampleData;

  const [annotationDataIndex, setAnnotationDataIndex] = useState(defaultAnnotationDataIndex);
  const annotationDatum = data[annotationDataIndex];

  // ToDo: add key bindings
  const [annotationDataKey, setAnnotationDataKey] = useState(annotationKey);

  useEffect(() => {
    setAnnotationDataKey(annotationKey);
  }, [annotationKey])

  // for series that support it, return a colorAccessor which returns a custom color if the datum is selected
  const colorAccessorFactory = useCallback(
    (dataKey: DataKey) => (d: CityTemperature) =>
      annotationDataKey === dataKey && d === data[annotationDataIndex]
        ? `url(#${selectedDatumPatternId})`
        : null,
    [annotationDataIndex, annotationDataKey],
  );

  const theme = getTheme(themeType);

  const renderHorizontally = orientation === 'horizontal';

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

  const renderBarGroup = barType === 'group';
  const renderBarSeries = barType === 'default';
  const renderBarStack = barType === 'stack';
  const renderAreaSeries = lineType === 'area';
  const renderAreaStack = lineType === 'areaStack';
  const renderLineSeries = lineType === 'default';

  const accessors = useMemo(
    () => ({
      x: {
        'San Francisco': renderHorizontally
          ? hasNegativeValues
            ? getNegativeSfTemperature
            : getSfTemperature
          : getDate,
        'New York': renderHorizontally ? getNyTemperature : getDate,
        Austin: renderHorizontally ? getAustinTemperature : getDate,
      },
      y: {
        'San Francisco': renderHorizontally
          ? getDate
          : hasNegativeValues
            ? getNegativeSfTemperature
            : getSfTemperature,
        'New York': renderHorizontally ? getDate : getNyTemperature,
        Austin: renderHorizontally ? getDate : getAustinTemperature,
      },
      date: getDate,
    }),
    [hasNegativeValues, renderHorizontally],
  );

  return (
    <>
      {/** This style is used for annotated elements via colorAccessor. */}
      <svg className="pattern-lines">
        <PatternLines
          id={selectedDatumPatternId}
          width={6}
          height={6}
          orientation={['diagonalRightToLeft']}
          stroke={theme?.axisStyles.x.bottom.axisLine.stroke}
          strokeWidth={1.5}
        />
      </svg>
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
    </>
  );
}

export default Example;
