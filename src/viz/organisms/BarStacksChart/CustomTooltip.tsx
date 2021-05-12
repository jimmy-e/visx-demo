import React from 'react';
import { OrdinalScale, TooltipData } from 'src/types';
import getDate from 'utils/accessors/getDate';
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
    return (
      <>
        <div style={{ color: stackScale(tooltipData.key) }}>
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
