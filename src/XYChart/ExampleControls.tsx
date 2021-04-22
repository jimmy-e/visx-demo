import React from 'react';
import { XYChartProps } from '../types';

type Props = {
  children: (props: XYChartProps) => React.ReactElement;
  height: number;
  width: number;
};

const ExampleControls: React.FC<Props> = ({ children, height, width }) => (
  <>
    {children({
      height,
      width,
    })}
    <div className="controls">
      <br />
    </div>
  </>
);

export default  ExampleControls;
