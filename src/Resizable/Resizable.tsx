import React from 'react';
import { Resizable as ReResizable } from 're-resizable';
import './resizable.scss';

const Resizable = () => (
  <ReResizable
    className="resizable"
    defaultSize={{
      width: 200,
      height: 200
    }}
  >
    001
  </ReResizable>
);

export default Resizable;
