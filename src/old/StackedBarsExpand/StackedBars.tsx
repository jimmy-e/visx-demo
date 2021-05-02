import React from 'react';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { BarStackHorizontal } from '@visx/shape';
import { Group } from '@visx/group';
import { localPoint } from '@visx/event';
import { UseTooltipParams } from '@visx/tooltip/lib/hooks/useTooltip';
import config from './config';
import { CityName, ColorScale, DateScale, Keys, TemperatureScale, TooltipData } from './types';
import { getDate } from './utils';

interface Props {
  colorScale: ColorScale;
  data: CityTemperature[];
  dateScale: DateScale;
  hideTooltip: UseTooltipParams<TooltipData>['hideTooltip'];
  keys: Keys;
  showTooltip: UseTooltipParams<TooltipData>['showTooltip'];
  temperatureScale: TemperatureScale;
}

const StackedBars: React.FC<Props> = ({
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
      <BarStackHorizontal<CityTemperature, CityName>
        data={data}
        keys={keys}
        y={getDate}
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
      </BarStackHorizontal>
    </Group>
  );
}

export default StackedBars;
