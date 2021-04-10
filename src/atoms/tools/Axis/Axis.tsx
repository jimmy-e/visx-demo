import React from 'react';
import { AnimatedAxis, Axis as StaticAxis } from '@visx/xychart';
import { AnimatedAxisProps } from '@visx/xychart/lib/components/axis/AnimatedAxis';
import { XYChartProps } from 'src/types';

// ToDo: Repalce `any` with proper axis scale typing
interface Props extends AnimatedAxisProps<any> {
  isAnimated: XYChartProps['isAnimated'];
}

const Axis: React.FC<Props> = ({ isAnimated, ...props }) => {
  const VisxAxis = isAnimated ? AnimatedAxis : StaticAxis;

  return <VisxAxis {...props} />;
}

export default Axis;
