import React from 'react';
import Example from './Example';
import { XYChartProps } from './types';

const XYChart: React.FC<XYChartProps> = (props) => <Example {...props} />;

export default XYChart;
