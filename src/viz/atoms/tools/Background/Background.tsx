import React from 'react';
import { useConfigContext } from 'contexts/configContext/configContext';

interface Props {
  height: number;
  width: number;
}

const Background: React.FC<Props> = ({ height, width }) => {
  const { config } = useConfigContext();

  return (
    <rect
      x={0}
      y={0}
      height={height}
      width={width}
      fill={config.theme.tools.background.backgroundColor}
      rx={config.theme.tools.background.radius}
    />
  );
};

export default Background;
