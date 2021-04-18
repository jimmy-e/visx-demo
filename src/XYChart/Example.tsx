import React from 'react';
import Annotation from 'tools/Annotation/Annotation';
import AreaSeries from 'shapes/AreaSeries/AreaSeries';
import AreaStack from 'shapes/AreaStack/AreaStack';
import Axis from 'tools/Axis/Axis';
import BarGroup from 'shapes/BarGroup/BarGroup';
import BarSeries from 'shapes/BarSeries/BarSeries';
import BarStack from 'shapes/BarStack/BarStack';
import GlyphSeries from 'shapes/GlyphSeries/GlyphSeries';
import LineSeries from 'shapes/LineSeries/LineSeries';
import Tooltip from 'tools/Tooltip/Tooltip';
import XYChart from 'molecules/XYChart/XYChart';
import { XYChartProps } from 'src/types';
import CustomChartBackground from './CustomChartBackground';
import CustomTooltip from './CustomTooltip';

const Example: React.FC<XYChartProps> = (props) => {
  const {
    accessors,
    animationTrajectory,
    annotationDataKey,
    annotationDatum,
    annotationLabelPosition,
    annotationType,
    colorAccessorFactory,
    config,
    curve,
    data,
    editAnnotationLabelPosition,
    height,
    isAnimated,
    numTicks,
    renderAreaSeries,
    renderAreaStack,
    renderBarGroup,
    renderBarSeries,
    renderBarStack,
    renderGlyph,
    renderGlyphSeries,
    renderHorizontally,
    renderLineSeries,
    setAnnotationDataIndex,
    setAnnotationDataKey,
    setAnnotationLabelPosition,
    sharedTooltip,
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

    // components are animated or not depending on selection
    Grid,
  } = props;
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
      {renderGlyphSeries && (
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
          dx={annotationLabelPosition.dx}
          dy={annotationLabelPosition.dy}
          editable={editAnnotationLabelPosition}
          isAnimated={isAnimated}
          onDragEnd={({ dx, dy }) => setAnnotationLabelPosition({ dx, dy })}
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
            showSeriesGlyphs={sharedTooltip && !renderBarGroup}
            showVerticalCrosshair={showVerticalCrosshair}
            snapTooltipToDatumX={snapTooltipToDatumX}
            snapTooltipToDatumY={snapTooltipToDatumY}
            renderTooltip={({ tooltipData, colorScale }) => (
              <CustomTooltip
                accessors={accessors}
                colorScale={colorScale}
                renderHorizontally={renderHorizontally}
                sharedTooltip={sharedTooltip}
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
