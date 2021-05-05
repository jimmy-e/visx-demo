import React from 'react';
import { BarStack as VisxBarStack } from '@visx/shape';
import { Group } from '@visx/group';
import { UseTooltipParams } from '@visx/tooltip/lib/hooks/useTooltip';
import BarStack from 'shapes/BarStack/BarStack';
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
  keys: Keys;
  showTooltip?: UseTooltipParams<TooltipData>['showTooltip'];
  stackScale: OrdinalScale;
  xScale: BandScale;
  yScale: LinearScale;
}

const BarStacks: React.FC<Props> = ({
  accessor,
  data,
  hideTooltip,
  keys,
  showTooltip,
  stackScale,
  xScale,
  yScale,
}) => {
  const { config } = useConfigContext();

  console.log('****************');
  // console.log(yScale.domain([0, 1]));
  console.log('****************');

  return (
    <Group top={config.dimensions.margin.top}>
      <VisxBarStack<Datum, string>
        color={stackScale}
        data={data}
        keys={keys}
        offset="expand"
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
