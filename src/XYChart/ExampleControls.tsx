/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { XYChartProps } from '../types';

type Props = {
  children: (props: XYChartProps) => React.ReactElement;
  height: number;
  width: number;
};

export default function ExampleControls({ children, height, width }: Props) {
  return (
    <>
      {children({
        height,
        width,
      })}
      <div className="controls">
        <br />
      </div>
      <style jsx>{`
        .pattern-lines {
          position: absolute;
          pointer-events: none;
          opacity: 0;
        }
      `}</style>
    </>
  );
}
