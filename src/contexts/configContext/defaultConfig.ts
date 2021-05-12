import { Config } from 'src/types';

const config: Config = {
  margin: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 40,
  },
  theme: {
    background: {
      backgroundColor: '#EAEDFF',
      radius: 14,
    },
    colors: {
      barStacks: {
        colorOne: '#E0E6EB',
        colorTwo: '#21B59A',
      },
      default: {
        colorOne: '#013B6F',
        colorTwo: '#21B59A',
        colorThree: '#FCCAA7',
      },
    },
    grid: {
      stroke: '#000000',
      strokeOpacity: 0.1,
    },
    tooltip: {
      background: '#000000',
      color: '#FFFFFF',
      minWidth: 60,
    }
  },
};

export default config;
