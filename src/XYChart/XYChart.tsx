import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Example from './Example';
import ExampleTwo from './ExampleTwo';

const XYChart: React.FC = () => (
  <>
    <ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize>
    <ExampleTwo width={100} height={100} />
  </>
);

export default XYChart;
