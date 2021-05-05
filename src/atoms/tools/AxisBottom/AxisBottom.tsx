import React from 'react';
import { AxisBottom as VisxAxisBottom } from '@visx/axis';
import config from 'src/config';
import { DateScale } from 'organisms/StackedBars/types';
import { formatDate } from 'organisms/StackedBars/utils';

interface Props {
  dateScale: DateScale;
}

const AxisBottom: React.FC<Props> = ({ dateScale }) => {
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
