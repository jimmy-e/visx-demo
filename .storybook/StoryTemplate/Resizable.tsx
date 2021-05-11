import React from 'react';
import { Resizable as ReResizable } from 're-resizable';
import './resizable.scss';

interface Props {
  defaultHeight?: number;
  defaultWidth?: number;
}

const Resizable: React.FC<Props> = ({
  children,
  defaultHeight = 200,
  defaultWidth = 200,
}) => (
  <ReResizable
    className="resizable"
    defaultSize={{ height: defaultHeight, width: defaultWidth }}
  >
    {children}
  </ReResizable>
);

export default Resizable;
