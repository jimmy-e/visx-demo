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
  data: TooltipData;
  left: number | undefined;
  top: number | undefined;
}

const Tooltip: React.FC<Props> = ({
  TooltipInPortal,
  colorScale,
  data,
  left,
  top,
}) => {
  return (
    <TooltipInPortal left={left} top={top} style={styles.tooltipStyle}>
      <div style={{ color: colorScale(data.key) }}>
        <strong>{data.key}</strong>
      </div>
      <div>{data.bar.data[data.key]}℉</div>
      <div>
        <small>{formatDate(getDate(data.bar.data))}</small>
      </div>
    </TooltipInPortal>
  );
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
      {tooltipOpen && tooltipData && (
        <>
          <Tooltip
            TooltipInPortal={TooltipInPortal}
            colorScale={colorScale}
            data={tooltipData}
            top={tooltipTop}
            left={tooltipLeft}
          />
        </>
      )}
    </div>
  );
};

export default StackedBarsChart;
