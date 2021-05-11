import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { PatternLines } from '@visx/pattern';
import Annotation from 'tools/Annotation/Annotation';
import AreaSeries from '../AreaSeries/AreaSeries';
import AreaStack from '../AreaStack/AreaStack';
import Axis from '../XYAxis/XYAxis';
import BarGroup from '../BarGroup/BarGroup';
import BarSeries from '../BarSeries/BarSeries';
import XYBarStack from '../XYBarStack/XYBarStack';
import ChartBackground from '../XYBackground/XYBackground';
import GlyphSeries from '../GlyphSeries/GlyphSeries';
import Grid from '../XYGrid/XYGrid';
import LineSeries from '../LineSeries/LineSeries';
import Tooltip from '../XYTooltip/XYTooltip';
import VisxXYChart from '../wrappers/XYChart/XYChart';
import CustomTooltip from './CustomTooltip';
import getConfig from './getConfig';
import useAccessors from './useAccessors';
import useAnnotationData from './useAnnotationData';
import useAxisConfig from './useAxisConfig';
import useColorAccessorFactory from './useColorAccessorFactory';
import { XYChartProps } from './types';
import { getData } from './utils';
import './xyChart.css';

const numTicks = 4;
const selectedDatumPatternId = 'xychart-selected-datum';

interface Props extends XYChartProps {
  height: number;
  width: number;
}

const XYChart: React.FC<Props> = ({
  annotationKey,
  annotationType,
  barType,
  curveType,
  data: initialData,
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
    render,
    renderHorizontally,
    theme,
  } = getConfig({
    barType,
    curveType,
    lineType,
    orientation,
    themeType,
  });

  const data = getData(initialData, hasFewerDatum, hasMissingValues);

  const {
    annotationDataIndex,
    annotationDataKey,
    annotationDatum,
    setAnnotationDataIndex,
    setAnnotationDataKey,
  } = useAnnotationData({ annotationKey, data });

  const colorAccessorFactory = useColorAccessorFactory({
    annotationDataIndex,
    annotationDataKey,
    data,
    selectedDatumPatternId,
  });

  const axisConfig = useAxisConfig(renderHorizontally);

  const accessors = useAccessors({ hasNegativeValues, renderHorizontally });

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
        xScale={axisConfig.x}
        yScale={axisConfig.y}
        height={Math.min(400, height)}
        captureEvents={!editAnnotationLabelPosition}
        onPointerUp={d => {
          setAnnotationDataKey(d.key as 'New York' | 'San Francisco' | 'Austin');
          setAnnotationDataIndex(d.index);
        }}
      >
        <ChartBackground />
        <Grid
          key={`grid-${animationTrajectory}`} // force animate on update
          rows={showGridRows}
          columns={showGridColumns}
          animationTrajectory={animationTrajectory}
          numTicks={numTicks}
        />
        {render.barStack && (
          <XYBarStack
            accessors={accessors}
            data={data}
            isAnimated={isAnimated}
            offfset={stackOffset}
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
