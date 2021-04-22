/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { XYChartProps } from '../types';

const numTicks = 4;
const selectedDatumPatternId = 'xychart-selected-datum';

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
        numTicks,
        selectedDatumPatternId,
        width,
      })}
      <div className="controls">
        {/** data */}

        <br />

        {/** series */}
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
