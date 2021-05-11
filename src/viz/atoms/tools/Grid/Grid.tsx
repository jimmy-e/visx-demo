import React from 'react';
import { Grid as VisxGrid } from '@visx/grid';
import { useConfigContext } from 'contexts/configContext/configContext';
import { BandScale, LinearScale } from 'src/types';

interface Props {
  height: number;
  width: number;
  xScale: BandScale;
  yScale: LinearScale;
}

const Grid: React.FC<Props> = ({ height, width, xScale, yScale }) => {
  const { config } = useConfigContext();
  const { margin, theme } = config;

  return (
    <VisxGrid
      height={height}
      left={margin.left}
      stroke={theme.grid.stroke}
      strokeOpacity={theme.grid.strokeOpacity}
      top={margin.top}
      width={width}
      xOffset={xScale.bandwidth() / 2}
      xScale={xScale}
      yScale={yScale}
    />
  );
}

export default Grid;
