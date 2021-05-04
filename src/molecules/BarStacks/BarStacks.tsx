import React from 'react';
import { BarStack as VisxBarStack } from '@visx/shape';
import { Group } from '@visx/group';
import { UseTooltipParams } from '@visx/tooltip/lib/hooks/useTooltip';
import { localPoint } from '@visx/event';
import config from 'organisms/StackedBars/config';
import {
  Accessor,
  BandScale,
  Bar,
  Data,
  Datum,
  Keys,
  LinearScale,
  OrdinalScale,
  TooltipData,
} from 'src/types';

export interface Props {
  accessor: Accessor;
  data: Data;
  hideTooltip?: UseTooltipParams<TooltipData>['hideTooltip'];
  keys: Keys;
  showTooltip?: UseTooltipParams<TooltipData>['showTooltip'];
  stackScale: OrdinalScale;
  xScale: BandScale;
  yScale: LinearScale;
}

const BarStack: React.FC<Props> = ({
  accessor,
  data,
  hideTooltip,
  keys,
  showTooltip,
  stackScale,
  xScale,
  yScale,
}) => {
  let tooltipTimeout: number;

  const { margin } = config.dimensions;

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
    <Group top={margin.top}>
      <VisxBarStack<Datum, string>
        data={data}
        keys={keys}
        x={accessor}
        xScale={xScale}
        yScale={yScale}
        color={stackScale}
      >
        {barStacks =>
          barStacks.map(barStack =>
            barStack.bars.map(bar => (
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
            )),
          )
        }
      </VisxBarStack>
    </Group>
  );
}

export default BarStack;
