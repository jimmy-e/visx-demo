import { Config, ShapeType } from 'src/types';

const config: Config = {
  margin: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 40,
  },
  theme: {
    colors: {
      black: '#343741',
      blue: '#013B6F',
      brown: '#FCCAA7',
      green: '#21B59A',
      grey: '#E0E6EB',
      white: '#FFFFFF',
    },
    shapes: {
      [ShapeType.BAR_STACKS]: {
        colors: ['green', 'grey', 'blue']
      },
    },
    tools: {
      axis: {
        color: 'black',
        fontSize: 11,
      },
      background: {
        backgroundColor: 'brown',
        radius: 14,
      },
      grid: {
        stroke: 'black',
        strokeOpacity: 0.1,
      },
      tooltip: {
        backgroundColor: 'black',
        color: 'white',
        minWidth: 60,
      },
    },
  },
};

export default config;
