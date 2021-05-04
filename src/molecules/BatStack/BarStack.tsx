import React from 'react';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { BarStack as VisxBarStack } from '@visx/shape';
import { Group } from '@visx/group';
import { localPoint } from '@visx/event';
import { UseTooltipParams } from '@visx/tooltip/lib/hooks/useTooltip';
import config from 'organisms/StackedBars/config';
import { ColorScale, DateScale, Keys, TemperatureScale, TooltipData } from 'organisms/StackedBars/types';
import { getDate } from 'organisms/StackedBars/utils';

interface Props {
  colorScale: ColorScale;
  data: CityTemperature[];
  dateScale: DateScale;
  hideTooltip: UseTooltipParams<TooltipData>['hideTooltip'];
  keys: Keys;
  showTooltip: UseTooltipParams<TooltipData>['showTooltip'];
  temperatureScale: TemperatureScale;
}

const BarStack: React.FC<Props> = ({
  colorScale,
  data,
  dateScale,
  hideTooltip,
  keys,
  showTooltip,
  temperatureScale,
}) => {
  let tooltipTimeout: number;

  const { margin } = config.dimensions;

  return (
    <Group top={margin.top}>
      <VisxBarStack<CityTemperature, string>
        data={data}
        keys={keys}
        x={getDate}
        xScale={dateScale}
        yScale={temperatureScale}
        color={colorScale}
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
                onClick={() => alert(`clicked: ${JSON.stringify(bar)}`)}
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip();
                  }, 300);
                }}
                onMouseMove={event => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  const eventSvgCoords = localPoint(event);
                  const left = bar.x + bar.width / 2;
                  showTooltip({
                    tooltipData: bar,
                    tooltipTop: eventSvgCoords?.y,
                    tooltipLeft: left,
                  });
                }}
              />
            )),
          )
        }
      </VisxBarStack>
    </Group>
  );
}

export default BarStack;
