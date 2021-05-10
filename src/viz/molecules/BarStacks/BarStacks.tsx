import React, { useEffect, useState } from 'react';
import { BarStack as VisxBarStack } from '@visx/shape';
import { Group } from '@visx/group';
import { UseTooltipParams } from '@visx/tooltip/lib/hooks/useTooltip';
import BarStack from 'shapes/BarStack/BarStack';
import getKeys from 'utils/getKeys';
import getStackScale from 'utils/getStackScale';
import getXScale from 'utils/getXScale';
import getYScale from 'utils/getYScale';
import {
  Accessor,
  Data,
  Datum,
  Keys,
  TooltipData,
} from 'src/types';
import { useConfigContext } from 'contexts/configContext/configContext';

export interface Props {
  accessor: Accessor;
  data: Data;
  hideTooltip?: UseTooltipParams<TooltipData>['hideTooltip'];
  index: string;
  offset?: 'auto' | 'expand';
  showTooltip?: UseTooltipParams<TooltipData>['showTooltip'];
}

const BarStacks: React.FC<Props> = ({
  accessor,
  data,
  hideTooltip,
  index,
  offset = 'auto',
  showTooltip,
}) => {
  const { config } = useConfigContext();
  const [keys, setKeys] = useState<Keys>();

  useEffect(() => {
    setKeys(getKeys(data, index));
  }, [])

  // ToDo: for some reason, moving this into `useEffect` causes problems.
  const stackScale = getStackScale(config.theme.colors, data, getKeys(data, index));
  const xScale = getXScale(data, index, config.dimensions.xMax);
  const yScale = getYScale(data, index, config.dimensions.yMax);

  return (
    <Group top={config.dimensions.margin.top}>
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
