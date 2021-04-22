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
  // More complicated
  const [missingValues, setMissingValues] = useState(false);

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
        <div>
          <strong>data</strong>
          <label>
            <input
              type="checkbox"
              onChange={() => setMissingValues(!missingValues)}
              checked={missingValues}
            />
            missing values
          </label>
        </div>

        <br />

        {/** series */}
        <br />
      </div>
      <style jsx>{`
        .controls {
          font-size: 13px;
          line-height: 1.5em;
        }
        .controls > div {
          margin-bottom: 4px;
        }
        label {
          font-size: 12px;
        }
        input[type='radio'] {
          height: 10px;
        }
        .pattern-lines {
          position: absolute;
          pointer-events: none;
          opacity: 0;
        }
      `}</style>
    </>
  );
}
