import React from 'react';
import cityTemperature from '@visx/mock-data/lib/mocks/cityTemperature';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { TooltipInPortalProps } from '@visx/tooltip/lib/hooks/useTooltipInPortal';
import AxisBottom from './AxisBottom';
import Background from './Background';
import Grid from './Grid';
import Legend from './Legend';
import StackedBars from './StackedBars';
import config from './config';
import { ColorScale, TooltipData } from './types';
import { formatDate, getDate, getKeys } from './utils';
import { getColorScale, getDateScale, getTemperatureScale } from './getScales';
import * as styles from './StackedBars.styles';

interface Props {
  TooltipInPortal: React.FC<TooltipInPortalProps>;
  colorScale: ColorScale;
  left: number | undefined;
  tooltipData: TooltipData | undefined;
  tooltipOpen: boolean;
  top: number | undefined;
}

const Tooltip: React.FC<Props> = ({
  TooltipInPortal,
  colorScale,
  left,
  tooltipData,
  tooltipOpen,
  top,
}) => {
  if (tooltipOpen && tooltipData) {
    return (
      <TooltipInPortal left={left} top={top} style={styles.tooltipStyle}>
        <div style={{ color: colorScale(tooltipData.key) }}>
          <strong>{tooltipData.key}</strong>
        </div>
        <div>{tooltipData.bar.data[tooltipData.key]}℉</div>
        <div>
          <small>{formatDate(getDate(tooltipData.bar.data))}</small>
        </div>
      </TooltipInPortal>
    );
  }

  return null;
};

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
