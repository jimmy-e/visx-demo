import React from 'react';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import AreaSeries from 'shapes/AreaSeries/AreaSeries';
import AreaStack from 'shapes/AreaStack/AreaStack';
import BarGroup from 'shapes/BarGroup/BarGroup';
import BarSeries from 'shapes/BarSeries/BarSeries';
import BarStack from 'shapes/BarStack/BarStack';
import LineSeries from 'shapes/LineSeries/LineSeries';
import { City, XYChartProps } from 'src/types';
import CustomChartBackground from './CustomChartBackground';

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
    Annotation,
    Axis,
    GlyphSeries,
    Grid,
    AnnotationCircleSubject,
    AnnotationConnector,
    AnnotationLabel,
    AnnotationLineSubject,
    Tooltip,
    XYChart,
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
          dataKey="San Francisco"
          data={data}
          xAccessor={accessors.x['San Francisco']}
          yAccessor={accessors.y['San Francisco']}
          renderGlyph={renderGlyph}
          colorAccessor={colorAccessorFactory('San Francisco')}
        />
      )}
      <Axis
        key={`time-axis-${animationTrajectory}-${renderHorizontally}`}
        orientation={renderHorizontally ? yAxisOrientation : xAxisOrientation}
        numTicks={numTicks}
        animationTrajectory={animationTrajectory}
      />
      <Axis
        key={`temp-axis-${animationTrajectory}-${renderHorizontally}`}
        label={
          stackOffset == null
            ? 'Temperature (°F)'
            : stackOffset === 'expand'
            ? 'Fraction of total temperature'
            : ''
        }
        orientation={renderHorizontally ? xAxisOrientation : yAxisOrientation}
        numTicks={numTicks}
        animationTrajectory={animationTrajectory}
        // values don't make sense in stream graph
        tickFormat={stackOffset === 'wiggle' ? () => '' : undefined}
      />
      {annotationDataKey && annotationDatum && (
        <Annotation
          dataKey={annotationDataKey}
          datum={annotationDatum}
          dx={annotationLabelPosition.dx}
          dy={annotationLabelPosition.dy}
          editable={editAnnotationLabelPosition}
          canEditSubject={false}
          onDragEnd={({ dx, dy }) => setAnnotationLabelPosition({ dx, dy })}
        >
          <AnnotationConnector />
          {annotationType === 'circle' ? (
            <AnnotationCircleSubject />
          ) : (
            <AnnotationLineSubject />
          )}
          <AnnotationLabel
            title={annotationDataKey}
            subtitle={`${annotationDatum.date}, ${annotationDatum[annotationDataKey]}°F`}
            width={135}
            backgroundProps={{
              stroke: theme.gridStyles.stroke,
              strokeOpacity: 0.5,
              fillOpacity: 0.8,
            }}
          />
        </Annotation>
      )}
      {showTooltip && (
        <Tooltip<CityTemperature>
          showHorizontalCrosshair={showHorizontalCrosshair}
          showVerticalCrosshair={showVerticalCrosshair}
          snapTooltipToDatumX={snapTooltipToDatumX}
          snapTooltipToDatumY={snapTooltipToDatumY}
          showDatumGlyph={(snapTooltipToDatumX || snapTooltipToDatumY) && !renderBarGroup}
          showSeriesGlyphs={sharedTooltip && !renderBarGroup}
          renderTooltip={({ tooltipData, colorScale }) => (
            <>
              {/** date */}
              {(tooltipData?.nearestDatum?.datum &&
                accessors.date(tooltipData?.nearestDatum?.datum)) ||
              'No date'}
              <br />
              <br />
              {/** temperatures */}
              {((sharedTooltip
                  ? Object.keys(tooltipData?.datumByKey ?? {})
                  : [tooltipData?.nearestDatum?.key]
              ).filter(city => city) as City[]).map(city => {
                const temperature =
                  tooltipData?.nearestDatum?.datum &&
                  accessors[renderHorizontally ? 'x' : 'y'][city](
                    tooltipData?.nearestDatum?.datum,
                  );

                return (
                  <div key={city}>
                    <em
                      style={{
                        color: colorScale?.(city),
                        textDecoration:
                          tooltipData?.nearestDatum?.key === city ? 'underline' : undefined,
                      }}
                    >
                      {city}
                    </em>{' '}
                    {temperature == null || Number.isNaN(temperature)
                      ? '–'
                      : `${temperature}° F`}
                  </div>
                );
              })}
            </>
          )}
        />
      )}
    </XYChart>
  );
}

export default Example;
