import React from 'react';
import { OrdinalScale, TooltipData } from 'src/types';
import { formatDate, getDate } from './utils';

interface Props {
  colorScale: OrdinalScale;
  tooltipData?: TooltipData;
}

const BarStacksChartTooltip: React.FC<Props> = ({
  colorScale,
  tooltipData,
}) => {
  if (tooltipData) {
    return (
      <>
        <div style={{ color: colorScale(tooltipData.key) }}>
          <strong>{tooltipData.key}</strong>
        </div>
        <div>{tooltipData.bar.data[tooltipData.key]}℉</div>
        <div>
          <small>{formatDate(getDate(tooltipData.bar.data))}</small>
        </div>
      </>
    );
  }

  return null;
};

export default BarStacksChartTooltip;
