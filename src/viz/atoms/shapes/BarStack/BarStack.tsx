import React from 'react';
import { UseTooltipParams } from '@visx/tooltip/lib/hooks/useTooltip';
import { localPoint } from '@visx/event';
import { BarShape, BarStackShape, TooltipData } from 'src/types';
import Bar from 'shapes/Bar/Bar';

export interface Props {
  barStack: BarStackShape;
  hideTooltip?: UseTooltipParams<TooltipData>['hideTooltip'];
  showTooltip?: UseTooltipParams<TooltipData>['showTooltip'];
}

const BarStack: React.FC<Props> = ({
  barStack,
  hideTooltip,
  showTooltip,
}) => {
  let tooltipTimeout: number;

  const handleMouseLeave = (): void => {
    if (hideTooltip) {
      tooltipTimeout = window.setTimeout(() => {
        hideTooltip();
      }, 300);
    }
  };

  const handleMouseMove = (bar: BarShape, event: React.MouseEvent<SVGRectElement>): void => {
    if (showTooltip) {
      if (tooltipTimeout) clearTimeout(tooltipTimeout);
      const eventSvgCoords = localPoint(event);
      const left = bar.x + bar.width / 2;
      showTooltip({
        tooltipData: bar,
        tooltipTop: eventSvgCoords?.y,
        tooltipLeft: left,
      });
    }
  }

  return (
    <>
      {barStack.bars.map((bar, index) => (
        <Bar
          key={`${bar.key}-${index}`}
          bar={bar}
          onMouseLeave={handleMouseLeave}
          onMouseMove={(event) => handleMouseMove(bar, event)}
        />
      ))}
    </>
  );
}

export default BarStack;
