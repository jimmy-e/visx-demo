import React from 'react';
import { Resizable as ReResizable } from 're-resizable';
import './resizable.scss';

interface Props {
  size?: {
    height: number;
    width: number;
  };
}

const Resizable: React.FC<Props> = ({
  children,
  size = { height: 400, width: 400 },
}) => (
  <ReResizable
    className="resizable"
    defaultSize={{ height: size.height, width: size.width }}
  >
    {children}
  </ReResizable>
);

export default Resizable;
