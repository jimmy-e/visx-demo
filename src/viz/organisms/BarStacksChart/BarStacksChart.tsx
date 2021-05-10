import React from 'react';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import AxisBottom from 'atoms/tools/AxisBottom/AxisBottom';
import Background from 'atoms/tools/Background/Background';
import BarStacks from 'molecules/BarStacks/BarStacks';
import Grid from 'atoms/tools/Grid/Grid';
import { Data, TooltipData } from 'src/types';
import { useConfigContext } from 'contexts/configContext/configContext';
import Tooltip from './Tooltip';
import { getDate } from './utils';
import { getColorScale, getDateScale, getTemperatureScale } from './getScales';
import * as styles from './BarStacksChart.styles';

interface Props {
  data: Data;
}

const BarStacksChart: React.FC<Props> = ({ data }) => {
  const { config } = useConfigContext();

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
        <BarStacks
          accessor={getDate}
          data={data}
          hideTooltip={hideTooltip}
          index="date"
          showTooltip={showTooltip}
          xScale={dateScale}
          yScale={temperatureScale}
        />
        <AxisBottom dateScale={dateScale} />
      </svg>
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

export default BarStacksChart;
