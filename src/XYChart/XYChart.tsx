import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { GlyphCross, GlyphDot, GlyphStar } from '@visx/glyph';
import { GlyphProps } from '@visx/xychart/lib/types';
import { PatternLines } from '@visx/pattern';
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
import VisxXYChart from 'molecules/XYChart/XYChart';
import { DataKey } from 'src/types';
import CustomChartBackground from './CustomChartBackground';
import CustomTooltip from './CustomTooltip';
import useConfigureXYChart from './useConfigureXYChart';
import { XYChartProps } from './types';
import './xyChart.css';

const numTicks = 4;
const selectedDatumPatternId = 'xychart-selected-datum';

const dateScaleConfig = { type: 'band', paddingInner: 0.3 };
const temperatureScaleConfig = { type: 'linear' };
const getSfTemperature = (d: CityTemperature) => Number(d['San Francisco']);
const getNegativeSfTemperature = (d: CityTemperature) => -getSfTemperature(d);
const getNyTemperature = (d: CityTemperature) => Number(d['New York']);
const getAustinTemperature = (d: CityTemperature) => Number(d.Austin);
const getDate = (d: CityTemperature) => d.date;

const defaultAnnotationDataIndex = 13;

interface Props extends XYChartProps {
  height: number;
  width: number;
}

const XYChart: React.FC<Props> = ({
  annotationKey,
  annotationType,
  barType,
  curveType,
  editAnnotationLabelPosition,
  glyphComponent,
  hasFewerDatum,
  hasMissingValues,
  hasNegativeValues,
  hasSharedTooltip,
  height,
  isAnimated,
  lineType,
  orientation,
  showGridColumns,
  showGridRows,
  showHorizontalCrosshair,
  showTooltip,
  showVerticalCrosshair,
  snapTooltipToDatumX,
  snapTooltipToDatumY,
  stackOffset,
  themeType,
  width,
  xAxisOrientation,
  yAxisOrientation,
}) => {
  const {
    animationTrajectory,
    curve,
    data,
    glyphOutline,
    render,
    renderHorizontally,
    theme,
  } = useConfigureXYChart({
    barType,
    curveType,
    hasFewerDatum,
    hasMissingValues,
    lineType,
    orientation,
    themeType,
  });

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


  const config = useMemo(
    () => ({
      x: renderHorizontally ? temperatureScaleConfig : dateScaleConfig,
      y: renderHorizontally ? dateScaleConfig : temperatureScaleConfig,
    }),
    [renderHorizontally],
  );

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
      {/** This div with the br child is needed, for some reason, in order to assure that our
       chart renders */}
      <div>
        <br />
      </div>
      {/** This style is used for annotated elements via colorAccessor. */}
      <svg className="patternLines">
        <PatternLines
          id={selectedDatumPatternId}
          width={6}
          height={6}
          orientation={['diagonalRightToLeft']}
          stroke={theme?.axisStyles.x.bottom.axisLine.stroke}
          strokeWidth={1.5}
        />
      </svg>
      <VisxXYChart
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
        {render.barStack && (
          <BarStack
            accessors={accessors}
            data={data}
            isAnimated={isAnimated}
            stackOffset={stackOffset}
          />
        )}
        {render.barGroup && (
          <BarGroup
            accessors={accessors}
            colorAccessorFactory={colorAccessorFactory}
            data={data}
            isAnimated={isAnimated}
          />
        )}
        {render.barSeries && (
          <BarSeries
            accessors={accessors}
            colorAccessorFactory={colorAccessorFactory}
            data={data}
            isAnimated={isAnimated}
          />
        )}
        {render.areaSeries && (
          <AreaSeries
            accessors={accessors}
            curve={curve}
            data={data}
            isAnimated={isAnimated}
          />
        )}
        {render.areaStack && (
          <AreaStack
            accessors={accessors}
            curve={curve}
            data={data}
            isAnimated={isAnimated}
            stackOffset={stackOffset}
          />
        )}
        {render.lineSeries && (
          <LineSeries
            accessors={accessors}
            curve={curve}
            data={data}
            isAnimated={isAnimated}
            renderBarSeries={render.barSeries}
          />
        )}
        {glyphComponent && (
          <GlyphSeries
            accessors={accessors}
            colorAccessorFactory={colorAccessorFactory}
            data={data}
            glyphComponent={glyphComponent}
            isAnimated={isAnimated}
            renderGlyph={renderGlyph}
            theme={theme}
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
              showDatumGlyph={(snapTooltipToDatumX || snapTooltipToDatumY) && !render.barGroup}
              showHorizontalCrosshair={showHorizontalCrosshair}
              showSeriesGlyphs={hasSharedTooltip && !render.barGroup}
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
      </VisxXYChart>
    </>
  );
}

// ----- ADDING RESPONSIVENESS ----- //

const XYChartResponsiveContainer: React.FC<XYChartProps> = (props) => (
  <ParentSize>
    {
      ({ height, width }) => (
        <XYChart height={height} width={width} {...props} />
      )
    }
  </ParentSize>
);

export default XYChartResponsiveContainer;
