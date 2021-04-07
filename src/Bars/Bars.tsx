import React from 'react';
import { letterFrequency } from '@visx/mock-data';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import getPoints from './getPoints';

// We'll use some mock data from `@visx/mock-data` for this.
const data = letterFrequency;

// Define the graph dimensions and margins
const width = 500;
const height = 500;
const margin = { top: 20, bottom: 20, left: 20, right: 20 };

// Then we'll create some bounds
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// We'll make some helpers to get at the data we want
// @ts-ignore
const xAccessor = d => d.letter;
// @ts-ignore
const yAccessor = d => +d.frequency * 100;

const { xPoint, yPoint, bandWidth } = getPoints(data, xAccessor, yAccessor);

// Finally we'll embed it all in an SVG
const Bars: React.FC = () => (
  <svg width={width} height={height}>
    {data.map((d, i) => {
      const barHeight = yMax - yPoint(d);
      return (
        <Group key={`bar-${i}`}>
          <Bar
            x={xPoint(d)}
            y={yMax - barHeight}
            height={barHeight}
            width={bandWidth}
            fill="#fc2e1c"
          />
        </Group>
      );
    })}
  </svg>
);

export default Bars;
