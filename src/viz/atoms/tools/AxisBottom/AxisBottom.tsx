import React from 'react';
import { AxisBottom as VisxAxisBottom } from '@visx/axis';
import { formatDate } from 'organisms/BarStacksChart/utils';
import { useConfigContext } from 'contexts/configContext/configContext';
import { BandScale } from 'src/types';

interface Props {
  top: number;
  xScale: BandScale;
}

const AxisBottom: React.FC<Props> = ({ top, xScale }) => {
  const { config } = useConfigContext();
  const { colorThree } = config.theme.colors;

  return (
    <VisxAxisBottom
      scale={xScale}
      stroke={colorThree}
      tickFormat={formatDate}
      tickStroke={colorThree}
      top={top}
      tickLabelProps={() => ({
        fill: colorThree,
        fontSize: 11,
        textAnchor: 'middle',
      })}
    />
  );
}

export default AxisBottom;
