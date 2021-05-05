import React from 'react';
import { Grid as VisxGrid } from '@visx/grid';
import { useConfigContext } from 'contexts/configContext/configContext';
import { DateScale, TemperatureScale } from 'organisms/BarStacksChart/types';

interface Props {
  dateScale: DateScale;
  temperatureScale: TemperatureScale;
}

const Grid: React.FC<Props> = ({ dateScale, temperatureScale }) => {
  const { config } = useConfigContext();
  const { margin, xMax, yMax } = config.dimensions;

  return (
    <VisxGrid
      top={margin.top}
      left={margin.left}
      xScale={dateScale}
      yScale={temperatureScale}
      width={xMax}
      height={yMax}
      stroke={config.theme.grid.stroke}
      strokeOpacity={config.theme.grid.strokeOpacity}
      xOffset={dateScale.bandwidth() / 2}
    />
  );
}

export default Grid;
