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

export default {
  dimensions: {
    ...measurements,
    xMax: measurements.width,
    yMax: measurements.height - measurements.margin.top - 100,
  },
  theme: {
    background: '#EAEDFF',
    colors: {
      purple1: '#6C5EFB',
      purple2: '#C998FF',
      purple3: '#A44AFE',
    },
    tooltip: {
      background: '#000000',
      color: '#FFFFFF',
      minWidth: 60,
    }
  },
};
