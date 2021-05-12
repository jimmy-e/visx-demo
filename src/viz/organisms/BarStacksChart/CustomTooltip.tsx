import React from 'react';
import { OrdinalScale, TooltipData } from 'src/types';
import { formatDate } from './utils';

interface Props {
  stackScale: OrdinalScale;
  tooltipData?: TooltipData;
}

const BarStacksChartTooltip: React.FC<Props> = ({
  stackScale,
  tooltipData,
}) => {
  if (tooltipData) {
    const date = tooltipData.bar.data.date;
    return (
      <>
        <div style={{ color: stackScale(tooltipData.key) }}>
          <strong>{tooltipData.key}</strong>
        </div>
        <div>{tooltipData.bar.data[tooltipData.key]}℉</div>
        <div>
          <small>{formatDate(date)}</small>
        </div>
      </>
    );
  }

  return null;
};

export default BarStacksChartTooltip;
