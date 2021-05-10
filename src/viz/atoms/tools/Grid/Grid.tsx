import React from 'react';
import { Grid as VisxGrid } from '@visx/grid';
import { useConfigContext } from 'contexts/configContext/configContext';
import { BandScale, LinearScale } from 'src/types';

interface Props {
  xScale: BandScale;
  yScale: LinearScale;
}

const Grid: React.FC<Props> = ({ xScale, yScale }) => {
  const { config } = useConfigContext();
  const { margin, xMax, yMax } = config.dimensions;

  return (
    <VisxGrid
      top={margin.top}
      left={margin.left}
      xScale={xScale}
      yScale={yScale}
      width={xMax}
      height={yMax}
      stroke={config.theme.grid.stroke}
      strokeOpacity={config.theme.grid.strokeOpacity}
      xOffset={xScale.bandwidth() / 2}
    />
  );
}

export default Grid;
