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
        colors: ['green', 'grey']
      },
    },
    tools: {
      background: {
        backgroundColor: '#EAEDFF',
        radius: 14,
      },
      grid: {
        stroke: '#000000',
        strokeOpacity: 0.1,
      },
      tooltip: {
        background: '#000000',
        color: '#FFFFFF',
        minWidth: 60,
      },
    },
  },
};

export default config;
