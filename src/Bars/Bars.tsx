import React from 'react';
import { letterFrequency } from '@visx/mock-data';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import dimensions from './dimensions';
import { getXScale, getYScale } from './getScales';

// We'll use some mock data from `@visx/mock-data` for this.
const data = letterFrequency;

// We'll make some helpers to get at the data we want
// @ts-ignore
const x = d => d.letter;
// @ts-ignore
const y = d => +d.frequency * 100;

// And then scale the graph by our data
const xScale = getXScale(data);
const yScale = getYScale(data);

// Compose together the scale and accessor functions to get point functions
// @ts-ignore
const compose = (scale, accessor) => data => scale(accessor(data));
const xPoint = compose(xScale, x);
const yPoint = compose(yScale, y);

// Finally we'll embed it all in an SVG
const Bars: React.FC = () => (
  <svg width={dimensions.width} height={dimensions.height}>
    {data.map((datum, index) => {
      const barHeight = dimensions.yMax - yPoint(datum);
      return (
        <Group key={`bar-${index}`}>
          <Bar
            x={xPoint(datum)}
            y={dimensions.yMax - barHeight}
            height={barHeight}
            width={xScale.bandwidth()}
            fill="#fc2e1c"
          />
        </Group>
      );
    })}
  </svg>
);

export default Bars;
