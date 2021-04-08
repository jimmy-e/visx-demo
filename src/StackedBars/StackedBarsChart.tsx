import React from 'react';
import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { BarStack } from '@visx/shape';
import { Group } from '@visx/group';
import { localPoint } from '@visx/event';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import AxisBottom from './AxisBottom';
import Grid from './Grid';
import Legend from './Legend';
import StackedBars from './StackedBars';
import config from './config';
import { CityName, TooltipData } from './types';
import { formatDate, getDate, getKeys } from './utils';
import { getColorScale, getDateScale, getTemperatureScale } from './getScales';
import * as styles from './StackedBars.styles';

const StackedBarsChart: React.FC = () => {
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

  const { height, margin, width } = config.dimensions;

  return (
    <div style={styles.containerStyle}>
      <svg ref={containerRef} width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={config.theme.background} rx={14} />
        <Grid dateScale={dateScale} temperatureScale={temperatureScale} />
        <StackedBars
          colorScale={colorScale}
          data={data}
          dateScale={dateScale}
          hideTooltip={hideTooltip}
          keys={keys}
          showTooltip={showTooltip}
          temperatureScale={temperatureScale}
        />
        <AxisBottom dateScale={dateScale} />
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

export default StackedBarsChart;
