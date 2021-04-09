import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Example from './Example';

const XYChart: React.FC = () => (
  <ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize>
);

export default XYChart;
