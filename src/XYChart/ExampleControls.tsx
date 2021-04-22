/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import cityTemperature from '@visx/mock-data/lib/mocks/cityTemperature';
import { XYChartProps } from '../types';

const numTicks = 4;
const data = cityTemperature.slice(225, 275);
const dataMissingValues = data.map((d, i) =>
  i === 10 || i === 11
    ? { ...d, 'San Francisco': 'nope', 'New York': 'notanumber', Austin: 'null' }
    : d,
);
const dataSmall = data.slice(0, 15);
const dataSmallMissingValues = dataMissingValues.slice(0, 15);
const selectedDatumPatternId = 'xychart-selected-datum';

type Props = {
  children: (props: XYChartProps) => React.ReactElement;
  height: number;
  width: number;
};

export default function ExampleControls({ children, height, width }: Props) {
  // More complicated
  const [fewerDatum, setFewerDatum] = useState(false);
  const [missingValues, setMissingValues] = useState(false);

  return (
    <>
      {children({
        data: fewerDatum
          ? missingValues
            ? dataSmallMissingValues
            : dataSmall
          : missingValues
            ? dataMissingValues
            : data,
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
          <label>
            <input
              type="checkbox"
              onChange={() => setFewerDatum(!fewerDatum)}
              checked={fewerDatum}
            />
            fewer datum
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
