import React, { useEffect, useState } from 'react';
import { BarStack as VisxBarStack } from '@visx/shape';
import { Group } from '@visx/group';
import { UseTooltipParams } from '@visx/tooltip/lib/hooks/useTooltip';
import BarStack from 'shapes/BarStack/BarStack';
import getKeys from 'utils/keys/getKeys';
import getStackScale from 'utils/scales/getStackScale';
import getXScale from 'utils/scales/getXScale';
import getYScale from 'utils/scales/getYScale';
import {
  Data,
  Datum,
  Keys,
  Offset,
  TooltipData,
} from 'src/types';
import { useConfigContext } from 'contexts/configContext/configContext';

export interface Props {
  data: Data;
  height: number;
  hideTooltip?: UseTooltipParams<TooltipData>['hideTooltip'];
  index: string;
  offset?: Offset;
  showTooltip?: UseTooltipParams<TooltipData>['showTooltip'];
  width: number;
}

const BarStacks: React.FC<Props> = ({
  data,
  height,
  hideTooltip,
  index,
  offset = 'auto',
  showTooltip,
  width,
}) => {
  const { config } = useConfigContext();
  const [keys, setKeys] = useState<Keys>();

  useEffect(() => {
    setKeys(getKeys(data, index));
  }, [])

  // ToDo: for some reason, moving this into `useEffect` causes problems.
  const stackScale = getStackScale({ colors: config.theme.colors.default, data, index });
  const xScale = getXScale({ data, index, xMax: width });
  const yScale = getYScale({ data, index, offset, yMax: height - config.margin.top - 100 });
  const accessor = (datum: Datum) => datum[index];

  return (
    <Group top={config.margin.top}>
      <VisxBarStack<Datum, string>
        color={stackScale}
        data={data}
        keys={keys}
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
