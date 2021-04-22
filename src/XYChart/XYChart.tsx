import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Example from './Example';
import { XYChartProps } from './types';

const XYChart: React.FC<XYChartProps> = (props) => (
  <ParentSize>
    {
      ({ height, width }) => (
        <Example height={height} width={width} {...props} />
      )
    }
  </ParentSize>
);

export default XYChart;
