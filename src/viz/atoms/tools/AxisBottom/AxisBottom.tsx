import React from 'react';
import { AxisBottom as VisxAxisBottom } from '@visx/axis';
import { DateScale } from 'organisms/StackedBars/types';
import { formatDate } from 'organisms/StackedBars/utils';
import { useConfigContext } from 'contexts/configContext/configContext';

interface Props {
  dateScale: DateScale;
}

const AxisBottom: React.FC<Props> = ({ dateScale }) => {
  const { config } = useConfigContext();
  const { yMax } = config.dimensions;
  const { purple3 } = config.theme.colors;

  return (
    <VisxAxisBottom
      top={yMax + config.dimensions.margin.top}
      scale={dateScale}
      tickFormat={formatDate}
      stroke={purple3}
      tickStroke={purple3}
      tickLabelProps={() => ({
        fill: purple3,
        fontSize: 11,
        textAnchor: 'middle',
      })}
    />
  );
}

export default AxisBottom;
