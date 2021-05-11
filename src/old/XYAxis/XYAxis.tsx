import React from 'react';
import { AnimatedAxis, Axis as StaticAxis } from '@visx/xychart';
import { AnimatedAxisProps } from '@visx/xychart/lib/components/axis/AnimatedAxis';
import { XYChartProps } from '../XYChart/types';

// ToDo: Repalce `any` with proper axis scale typing
interface Props extends AnimatedAxisProps<any> {
  isAnimated: XYChartProps['isAnimated'];
}

const XYAxis: React.FC<Props> = ({ isAnimated, ...props }) => {
  const Axis = isAnimated ? AnimatedAxis : StaticAxis;

  return <Axis {...props} />;
}

export default XYAxis;
