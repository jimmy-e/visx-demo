import React from 'react';
import { AnimatedGrid, Grid as StaticGrid } from '@visx/xychart';
import { AnimatedGridProps } from '@visx/xychart/lib/components/grid/AnimatedGrid';

interface Props extends AnimatedGridProps {
  isAnimated?: boolean;
}

const XYGrid: React.FC<Props> = ({ isAnimated, ...props }) => {
  const Grid = isAnimated ? AnimatedGrid : StaticGrid;

  return <Grid {...props} />;
}

export default XYGrid;
