import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { letterFrequency } from '@visx/mock-data';
import config from 'src/config';
import getPoints from './getPoints';
import { getXScale, getYScale } from './getScales';

const Bars: React.FC = () => {
  const data = letterFrequency;

  const xAccessor = (datum: LetterFrequency) => datum.letter;
  const yAccessor = (datum: LetterFrequency) => +datum.frequency * 100;

  const xScale = getXScale(data, xAccessor);
  const yScale = getYScale(data, yAccessor);

  const { xPoint, yPoint } = getPoints({ xAccessor, xScale, yAccessor, yScale });

  return (
    <svg width={config.dimensions.width} height={config.dimensions.height}>
      {data.map((datum, index) => {
        const barHeight = config.dimensions.yMax - yPoint(datum);
        return (
          <Group key={`bar-${index}`}>
            <Bar
              x={xPoint(datum)}
              y={config.dimensions.yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill={config.theme.fill}
            />
          </Group>
        );
      })}
    </svg>
  );
};

export default Bars;
