import React from 'react';
import { AxisBottom as VisxAxisBottom } from '@visx/axis';
import { DateScale } from 'organisms/BarStacksChart/types';
import { formatDate } from 'organisms/BarStacksChart/utils';
import { useConfigContext } from 'contexts/configContext/configContext';

interface Props {
  dateScale: DateScale;
}

const AxisBottom: React.FC<Props> = ({ dateScale }) => {
  const { config } = useConfigContext();
  const { yMax } = config.dimensions;
  const { colorThree } = config.theme.colors;

  return (
    <VisxAxisBottom
      top={yMax + config.dimensions.margin.top}
      scale={dateScale}
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
