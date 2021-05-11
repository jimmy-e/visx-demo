import React from 'react';
import { XYChart as VisxXYChart } from '@visx/xychart';
import { XYChartProps } from '@visx/xychart/lib/components/XYChart';

// ToDo: Repalce `any` with proper XScale, YScale, and Datum typing
type Props = XYChartProps<any, any, any>;

const XYChart: React.FC<Props> = ({ ...props }) => (
  <VisxXYChart {...props}>
    {props.children}
  </VisxXYChart>
);

export default XYChart;
