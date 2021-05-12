import React from 'react';
import { AxisBottom as VisxAxisBottom } from '@visx/axis';
import formatDate from 'utils/other/formatDate';
import { useConfigContext } from 'contexts/configContext/configContext';
import { BandScale } from 'src/types';

interface Props {
  top: number;
  xScale: BandScale;
}

const AxisBottom: React.FC<Props> = ({ top, xScale }) => {
  const { config } = useConfigContext();
  const { black } = config.theme.colors;

  return (
    <VisxAxisBottom
      scale={xScale}
      stroke={black}
      tickFormat={formatDate}
      tickStroke={black}
      top={top}
      tickLabelProps={() => ({
        fill: black,
        fontSize: 11,
        textAnchor: 'middle',
      })}
    />
  );
}

export default AxisBottom;
