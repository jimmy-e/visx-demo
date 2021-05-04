import React from 'react';
import config from 'organisms/StackedBars/config';

const Background: React.FC = () => (
  <rect
    x={0}
    y={0}
    width={config.dimensions.width}
    height={config.dimensions.height}
    fill={config.theme.background.backgroundColor}
    rx={config.theme.background.radius}
  />
);

export default Background;
