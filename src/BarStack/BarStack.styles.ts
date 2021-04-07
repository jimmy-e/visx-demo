import { defaultStyles } from '@visx/tooltip';
import config from './config';
import React from "react";

export const tooltipStyle = {
  ...defaultStyles,
  minWidth: config.theme.tooltip.minWidth,
  backgroundColor: config.theme.tooltip.background,
  color: config.theme.tooltip.color,
};

export const legendStyle = {
  display: 'flex',
  fontSize: '14px',
  justifyContent: 'center',
  position: 'absolute',
  top: config.dimensions.margin.top / 2 - 10,
  width: '100%',
};
