import {Bar} from "@visx/shape";
import React from "react";

const measurements = {
  height: 500,
  width: 500,
  margin: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
};

export default {
  dimensions: {
    ...measurements,
    xMax: measurements.width - measurements.margin.left - measurements.margin.top, // maximum x bound
    yMax: measurements.height - measurements.margin.top - measurements.margin.bottom, // maximum y bound
  },
  theme: {
    fill: '#14A8F3',
  },
};
