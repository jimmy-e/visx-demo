import React from 'react';
import { BarStack as VisxBarStack } from '@visx/shape';
import { Group } from '@visx/group';
import { UseTooltipParams } from '@visx/tooltip/lib/hooks/useTooltip';
import BarStack from 'shapes/BarStack/BarStack';
import getStackScale from 'utils/scales/getStackScale';
import getXScale from 'utils/scales/getXScale';
import getYScale from 'utils/scales/getYScale';
import {
  Datum,
  Offset,
  Payload,
  ShapeType,
  TooltipData,
} from 'src/types';
import { useConfigContext } from 'contexts/configContext/configContext';

export interface Props {
  height: number;
  hideTooltip?: UseTooltipParams<TooltipData>['hideTooltip'];
  offset?: Offset;
  payload: Payload;
  showTooltip?: UseTooltipParams<TooltipData>['showTooltip'];
  width: number;
}

const BarStacks: React.FC<Props> = ({
  height,
  hideTooltip,
  offset = 'auto',
  payload,
  showTooltip,
  width,
}) => {
  const { config } = useConfigContext();
  const { data } = payload;
  const { index } = payload.meta;

  // ToDo: for some reason, moving this into `useEffect` causes problems.
  const colors = config.theme.shapes[ShapeType.BAR_STACKS].colors.map((color) => config.theme.colors[color]);
  const stackScale = getStackScale({
    colors,
    data,
    index
  });
  const xScale = getXScale({ data, index, xMax: width });
  const yScale = getYScale({ data, index, offset, yMax: height - config.margin.top - 100 });
  const accessor = (datum: Datum) => datum[index];

  return (
    <Group top={config.margin.top}>
      <VisxBarStack<Datum, string>
        color={stackScale}
        data={data}
        keys={payload.meta.keys.allIds}
        offset={offset === 'auto' ? 'diverging' : offset}
        x={accessor}
        xScale={xScale}
        yScale={yScale}
      >
        {barStacks =>
          barStacks.map(barStack =>
            <BarStack
              key={`bar-stack-${barStack.index}`}
              barStack={barStack}
              hideTooltip={hideTooltip}
              showTooltip={showTooltip}
            />
          )
        }
      </VisxBarStack>
    </Group>
  );
};

export default BarStacks;
