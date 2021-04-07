import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { letterFrequency } from '@visx/mock-data';
import dimensions from './dimensions';
import getPoints from './getPoints';

const Bars: React.FC = () => {
  const data = letterFrequency;

  const xAccessor = (datum: LetterFrequency) => datum.letter;
  const yAccessor = (datum: LetterFrequency) => +datum.frequency * 100;

  const { xPoint, yPoint, bandWidth } = getPoints(data, xAccessor, yAccessor);

  return (
    <svg width={dimensions.width} height={dimensions.height}>
      {data.map((datum, index) => {
        const barHeight = dimensions.yMax - yPoint(datum);
        return (
          <Group key={`bar-${index}`}>
            <Bar
              x={xPoint(datum)}
              y={dimensions.yMax - barHeight}
              height={barHeight}
              width={bandWidth}
              fill="#fc2e1c"
            />
          </Group>
        );
      })}
    </svg>
  );
};

export default Bars;
