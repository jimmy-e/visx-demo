import React from 'react';
import { Grid as VisxGrid } from '@visx/grid';
import { useConfigContext } from 'contexts/configContext/configContext';
import { TemperatureScale } from 'organisms/BarStacksChart/types';
import { BandScale } from 'src/types';

interface Props {
  xScale: BandScale;
  temperatureScale: TemperatureScale;
}

const Grid: React.FC<Props> = ({ temperatureScale, xScale }) => {
  const { config } = useConfigContext();
  const { margin, xMax, yMax } = config.dimensions;

  return (
    <VisxGrid
      top={margin.top}
      left={margin.left}
      xScale={xScale}
      yScale={temperatureScale}
      width={xMax}
      height={yMax}
      stroke={config.theme.grid.stroke}
      strokeOpacity={config.theme.grid.strokeOpacity}
      xOffset={xScale.bandwidth() / 2}
    />
  );
}

export default Grid;
