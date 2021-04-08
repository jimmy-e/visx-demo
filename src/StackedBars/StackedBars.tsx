import React from 'react';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { BarStack } from '@visx/shape';
import { Group } from '@visx/group';
import { localPoint } from '@visx/event';
import { UseTooltipParams } from '@visx/tooltip/lib/hooks/useTooltip';
import config from './config';
import {CityName, ColorScale, DateScale, TemperatureScale, TooltipData} from './types';
import { getDate, getKeys } from './utils';

interface Props {
  colorScale: ColorScale;
  data: CityTemperature[];
  dateScale: DateScale;
  hideTooltip: UseTooltipParams<TooltipData>['hideTooltip'];
  showTooltip: UseTooltipParams<TooltipData>['showTooltip'];
  temperatureScale: TemperatureScale;
}

const StackedBars: React.FC<Props> = ({
  colorScale,
  data,
  dateScale,
  hideTooltip,
  showTooltip,
  temperatureScale,
}) => {
  const keys = getKeys(data);

  let tooltipTimeout: number;

  const { margin } = config.dimensions;

  return (
    <Group top={margin.top}>
      <BarStack<CityTemperature, CityName>
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
                  // TooltipInPortal expects coordinates to be relative to containerRef
                  // localPoint returns coordinates relative to the nearest SVG, which
                  // is what containerRef is set to in this example.
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
      </BarStack>
    </Group>
  );
}

export default StackedBars;
