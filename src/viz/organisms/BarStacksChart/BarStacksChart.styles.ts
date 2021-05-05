import { defaultStyles } from '@visx/tooltip';
// todo: replace this config import
import config from 'contexts/configContext/defaultConfig';

export const containerStyle = {
  position: 'relative',
};

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
