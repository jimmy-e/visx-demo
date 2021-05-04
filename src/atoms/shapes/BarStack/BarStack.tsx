import React from 'react';
import { BarStack as VisxBarStack } from '@visx/shape/lib/types/barStack';
import { UseTooltipParams } from '@visx/tooltip/lib/hooks/useTooltip';
import { localPoint } from '@visx/event';
import { Bar, Datum, TooltipData } from 'src/types';

export interface Props {
  barStack: VisxBarStack<Datum, string>;
  hideTooltip?: UseTooltipParams<TooltipData>['hideTooltip'];
  showTooltip?: UseTooltipParams<TooltipData>['showTooltip'];
}

const BarStack: React.FC<Props> = ({
  barStack,
  hideTooltip,
  showTooltip,
}) => {
  let tooltipTimeout: number;

  const handleClick = (bar: Bar): void => {
    alert(`clicked: ${JSON.stringify(bar)}`)
  };

  const handleMouseLeave = (): void => {
    if (hideTooltip) {
      tooltipTimeout = window.setTimeout(() => {
        hideTooltip();
      }, 300);
    }
  };

  const handleMouseMove = (bar: Bar, event: React.MouseEvent<SVGRectElement>): void => {
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
      {barStack.bars.map(bar => (
        <rect
          key={`bar-stack-${barStack.index}-${bar.index}`}
          x={bar.x}
          y={bar.y}
          height={bar.height}
          width={bar.width}
          fill={bar.color}
          onClick={() => handleClick(bar)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={(event) => handleMouseMove(bar, event)}
        />
      ))}
    </>
  );
}

export default BarStack;
