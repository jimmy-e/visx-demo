import React from 'react';
import { Resizable as ReResizable } from 're-resizable';

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

const Resizable = () => (
  <ReResizable
    style={style}
    defaultSize={{
      width: 200,
      height: 200
    }}
  >
    001
  </ReResizable>
);

export default Resizable;
