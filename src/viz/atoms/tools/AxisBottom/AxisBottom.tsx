import React from 'react';
import { AxisBottom as VisxAxisBottom } from '@visx/axis';
import { formatDate } from 'organisms/BarStacksChart/utils';
import { useConfigContext } from 'contexts/configContext/configContext';
import { BandScale } from 'src/types';

interface Props {
  xScale: BandScale;
}

const AxisBottom: React.FC<Props> = ({ xScale }) => {
  const { config } = useConfigContext();
  const { yMax } = config.dimensions;
  const { colorThree } = config.theme.colors;

  return (
    <VisxAxisBottom
      top={yMax + config.dimensions.margin.top}
      scale={xScale}
      tickFormat={formatDate}
      stroke={colorThree}
      tickStroke={colorThree}
      tickLabelProps={() => ({
        fill: colorThree,
        fontSize: 11,
        textAnchor: 'middle',
      })}
    />
  );
}

export default AxisBottom;
