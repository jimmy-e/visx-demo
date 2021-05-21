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
  const { color, fontSize } = config.theme.tools.axis;

  return (
    <VisxAxisBottom
      scale={xScale}
      stroke={color}
      tickFormat={formatDate}
      tickStroke={color}
      top={top}
      tickLabelProps={() => ({
        fill: color,
        fontSize: fontSize,
        textAnchor: 'middle',
      })}
    />
  );
}

export default AxisBottom;
