import React from 'react';
import { AnimatedGrid, Grid as StaticGrid } from '@visx/xychart';
import { AnimatedGridProps } from '@visx/xychart/lib/components/grid/AnimatedGrid';

interface Props extends AnimatedGridProps {
  isAnimated?: boolean;
}

const Grid: React.FC<Props> = ({ isAnimated, ...props }) => {
  const VisxGrid = isAnimated ? AnimatedGrid : StaticGrid;

  return <VisxGrid {...props} />;
}

export default Grid;
