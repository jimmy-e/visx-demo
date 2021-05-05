import React from 'react';
import { useConfigContext } from 'contexts/configContext/configContext';

const Background: React.FC = () => {
  const { config } = useConfigContext();

  return (
    <rect
      x={0}
      y={0}
      width={config.dimensions.width}
      height={config.dimensions.height}
      fill={config.theme.background.backgroundColor}
      rx={config.theme.background.radius}
    />
  );
};

export default Background;
