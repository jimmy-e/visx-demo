import React from 'react';
import { BarStack as VisxBarStack } from '@visx/shape';
import { Group } from '@visx/group';
import { UseTooltipParams } from '@visx/tooltip/lib/hooks/useTooltip';
import BarStack from 'shapes/BarStack/BarStack';
import getKeys from 'utils/getKeys';
import getStackScale from 'utils/getStackScale';
import {
  Accessor,
  BandScale,
  Data,
  Datum,
  Keys,
  LinearScale,
  OrdinalScale,
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
  stackScale: OrdinalScale;
  xScale: BandScale;
  yScale: LinearScale;
}

const BarStacks: React.FC<Props> = ({
  accessor,
  data,
  hideTooltip,
  index,
  offset = 'auto',
  showTooltip,
  stackScale,
  xScale,
  yScale,
}) => {
  const { config } = useConfigContext();

  const keys = getKeys(data, index)
  // const stackScale = getStackScale(config.theme.colors, data, keys);

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
