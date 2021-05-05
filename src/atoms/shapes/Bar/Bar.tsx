import React from 'react';
import { BarShape } from 'src/types';

export interface Props {
  bar: BarShape;
  onClick?: () => void;
  onMouseLeave?: () => void;
  onMouseMove?: (event: React.MouseEvent<SVGRectElement>) => void;
}

const Bar: React.FC<Props> = ({
  bar,
  onClick,
  onMouseLeave,
  onMouseMove,
}) => (
  <rect
    x={bar.x}
    y={bar.y}
    height={bar.height}
    width={bar.width}
    fill={bar.color}
    onClick={onClick}
    onMouseLeave={onMouseLeave}
    onMouseMove={onMouseMove}
  />
);

export default Bar;
