import React from 'react';
import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { AxisBottom } from '@visx/axis';
import { BarStack } from '@visx/shape';
import { Grid } from '@visx/grid';
import { Group } from '@visx/group';
import { localPoint } from '@visx/event';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import Legend from './Legend';
import config from './config';
import { CityName, TooltipData } from './types';
import { formatDate, getDate, getKeys } from './utils';
import { getColorScale, getDateScale, getTemperatureScale } from './getScales';
import * as styles from './StackedBars.styles';

const StackedBars: React.FC = () => {
  const data = cityTemperature.slice(0, 12);
  const keys = getKeys(data);

  const dateScale = getDateScale(data);
  const temperatureScale = getTemperatureScale(data);
  const colorScale = getColorScale(data);

  let tooltipTimeout: number;

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  });

  const { height, margin, width, xMax, yMax } = config.dimensions;

  dateScale.rangeRound([0, xMax]);
  temperatureScale.range([yMax, 0]);

  return (
    <div style={styles.containerStyle}>
      <svg ref={containerRef} width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={config.theme.background} rx={14} />
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={dateScale}
          yScale={temperatureScale}
          width={xMax}
          height={yMax}
          stroke="black"
          strokeOpacity={0.1}
          xOffset={dateScale.bandwidth() / 2}
        />
        <Group top={margin.top}>
          <BarStack<CityTemperature, CityName>
            data={data}
            keys={keys}
            x={getDate}
            xScale={dateScale}
            yScale={temperatureScale}
            color={colorScale}
          >
            {barStacks =>
              barStacks.map(barStack =>
                barStack.bars.map(bar => (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    height={bar.height}
                    width={bar.width}
                    fill={bar.color}
                    onClick={() => alert(`clicked: ${JSON.stringify(bar)}`)}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {
                        hideTooltip();
                      }, 300);
                    }}
                    onMouseMove={event => {
                      if (tooltipTimeout) clearTimeout(tooltipTimeout);
                      // TooltipInPortal expects coordinates to be relative to containerRef
                      // localPoint returns coordinates relative to the nearest SVG, which
                      // is what containerRef is set to in this example.
                      const eventSvgCoords = localPoint(event);
                      const left = bar.x + bar.width / 2;
                      showTooltip({
                        tooltipData: bar,
                        tooltipTop: eventSvgCoords?.y,
                        tooltipLeft: left,
                      });
                    }}
                  />
                )),
              )
            }
          </BarStack>
        </Group>
        <AxisBottom
          top={yMax + config.dimensions.margin.top}
          scale={dateScale}
          tickFormat={formatDate}
          stroke={config.theme.colors.purple3}
          tickStroke={config.theme.colors.purple3}
          tickLabelProps={() => ({
            fill: config.theme.colors.purple3,
            fontSize: 11,
            textAnchor: 'middle',
          })}
        />
      </svg>
      <Legend colorScale={colorScale} />
      {tooltipOpen && tooltipData && (
        <TooltipInPortal top={tooltipTop} left={tooltipLeft} style={styles.tooltipStyle}>
          <div style={{ color: colorScale(tooltipData.key) }}>
            <strong>{tooltipData.key}</strong>
          </div>
          <div>{tooltipData.bar.data[tooltipData.key]}℉</div>
          <div>
            <small>{formatDate(getDate(tooltipData.bar.data))}</small>
          </div>
        </TooltipInPortal>
      )}
    </div>
  );
}

export default StackedBars;
