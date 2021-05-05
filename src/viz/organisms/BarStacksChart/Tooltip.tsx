import React from 'react';
import { TooltipInPortalProps } from '@visx/tooltip/lib/hooks/useTooltipInPortal';
import { ColorScale, TooltipData } from './types';
import { formatDate, getDate } from './utils';
import * as styles from './BarStacksChart.styles';

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

export default Tooltip;
