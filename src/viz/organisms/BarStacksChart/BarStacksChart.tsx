import React from 'react';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import AxisBottom from 'atoms/tools/AxisBottom/AxisBottom';
import Background from 'atoms/tools/Background/Background';
import BarStacks from 'molecules/BarStacks/BarStacks';
import Grid from 'atoms/tools/Grid/Grid';
import Tooltip from 'tools/Tooltip/Tooltip';
import getKeys from 'utils/getKeys';
import getStackScale from 'utils/getStackScale';
import { Data, TooltipData } from 'src/types';
import { useConfigContext } from 'contexts/configContext/configContext';
import CustomTooltip from './CustomTooltip';
import getXScale from 'utils/getXScale';
import { getDate } from './utils';
import { getTemperatureScale } from './getScales';
import * as styles from './BarStacksChart.styles';

interface Props {
  data: Data;
  index: string;
}

const BarStacksChart: React.FC<Props> = ({ data, index }) => {
  const { config } = useConfigContext();

  const xScale = getXScale(data, index, config.dimensions.xMax);
  const temperatureScale = getTemperatureScale(data);
  const stackScale = getStackScale(config.theme.colors, data, getKeys(data, index));

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
        <Grid xScale={xScale} temperatureScale={temperatureScale} />
        <BarStacks
          accessor={getDate}
          data={data}
          hideTooltip={hideTooltip}
          index="date"
          showTooltip={showTooltip}
          yScale={temperatureScale}
        />
        <AxisBottom xScale={xScale} />
      </svg>
      <Tooltip
        TooltipInPortal={TooltipInPortal}
        showTooltip={!!(tooltipOpen && tooltipData)}
        tooltipLeft={tooltipLeft}
        tooltipTop={tooltipTop}
      >
        <CustomTooltip stackScale={stackScale} tooltipData={tooltipData} />
      </Tooltip>
    </div>
  );
};

export default BarStacksChart;
