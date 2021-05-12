import React from 'react';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import AxisBottom from 'atoms/tools/AxisBottom/AxisBottom';
import Background from 'atoms/tools/Background/Background';
import BarStacks from 'molecules/BarStacks/BarStacks';
import Grid from 'atoms/tools/Grid/Grid';
import Tooltip from 'tools/Tooltip/Tooltip';
import getStackScale from 'utils/scales/getStackScale';
import getXScale from 'utils/scales/getXScale';
import getYScale from 'utils/scales/getYScale';
import { Payload, TooltipData } from 'src/types';
import { useConfigContext } from 'contexts/configContext/configContext';
import CustomTooltip from './CustomTooltip';
import * as styles from './BarStacksChart.styles';

interface Props {
  height: number;
  payload: Payload;
  width: number;
}

const BarStacksChart: React.FC<Props> = ({ height, payload, width }) => {
  const { config } = useConfigContext();

  const top = height - 100;
  const yMax = top - config.margin.top;

  const xScale = getXScale({
    data: payload.data,
    index: payload.meta.index,
    xMax: width,
  });
  const yScale = getYScale({
    data: payload.data,
    index: payload.meta.index,
    offset: 'auto', yMax,
  });
  const stackScale = getStackScale({
    colors: config.theme.colors.default,
    data: payload.data,
    index: payload.meta.index,
  });

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

  return (
    <div style={styles.containerStyle}>
      <svg ref={containerRef} height={height} width={width}>
        <Background height={height} width={width} />
        <Grid height={yMax} width={width} xScale={xScale} yScale={yScale} />
        <BarStacks
          data={payload.data}
          height={height}
          hideTooltip={hideTooltip}
          index={payload.meta.index}
          showTooltip={showTooltip}
          width={width}
        />
        <AxisBottom
          top={top}
          xScale={xScale}
        />
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
