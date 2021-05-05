import { Config } from 'src/types';

const measurements = {
  height: 500,
  width: 500,
  margin: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 40,
  },
};

const config: Config = {
  dimensions: {
    ...measurements,
    xMax: measurements.width,
    yMax: measurements.height - measurements.margin.top - 100,
  },
  theme: {
    background: {
      backgroundColor: '#EAEDFF',
      radius: 14,
    },
    colors: {
      purple1: '#6C5EFB',
      purple2: '#C998FF',
      purple3: '#A44AFE',
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
