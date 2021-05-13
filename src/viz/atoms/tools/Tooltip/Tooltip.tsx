import React from 'react';
import { defaultStyles } from '@visx/tooltip';
import { TooltipData } from 'src/types';
import { TooltipInPortalProps } from '@visx/tooltip/lib/hooks/useTooltipInPortal';
import { useConfigContext } from 'contexts/configContext/configContext';

interface Props {
  TooltipInPortal: React.FC<TooltipInPortalProps>;
  showTooltip: boolean;
  tooltipLeft: number | undefined;
  tooltipTop: number | undefined;
}

const Tooltip: React.FC<Props> = ({
  TooltipInPortal,
  children,
  showTooltip,
  tooltipLeft,
  tooltipTop,
}) => {
  const { config } = useConfigContext();

  const styles = {
    ...defaultStyles,
    minWidth: config.theme.tools.tooltip.minWidth,
    backgroundColor: config.theme.tools.tooltip.background,
    color: config.theme.tools.tooltip.color,
  }

  if (showTooltip) {
    return (
      <TooltipInPortal left={tooltipLeft} top={tooltipTop} style={styles}>
        {children}
      </TooltipInPortal>
    );
  }

  return null;
};

export default Tooltip;
