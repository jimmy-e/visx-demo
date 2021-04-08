import React from 'react';
import cityTemperature from '@visx/mock-data/lib/mocks/cityTemperature';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import AxisBottom from './AxisBottom';
import Background from './Background';
import Grid from './Grid';
import Legend from './Legend';
import StackedBars from './StackedBars';
import Tooltip from './Tooltip';
import config from './config';
import { TooltipData } from './types';
import { getKeys } from './utils';
import { getColorScale, getDateScale, getTemperatureScale } from './getScales';
import * as styles from './StackedBars.styles';

const StackedBarsChart: React.FC = () => {
  const data = cityTemperature.slice(0, 12);
  const keys = getKeys(data);

  const dateScale = getDateScale(data);
  const temperatureScale = getTemperatureScale(data);
  const colorScale = getColorScale(data);

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

  const { height, width } = config.dimensions;

  return (
    <div style={styles.containerStyle}>
      <svg ref={containerRef} width={width} height={height}>
        <Background />
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
      <Tooltip
        TooltipInPortal={TooltipInPortal}
        colorScale={colorScale}
        left={tooltipLeft}
        tooltipData={tooltipData}
        tooltipOpen={tooltipOpen}
        top={tooltipTop}
      />
    </div>
  );
};

export default StackedBarsChart;
