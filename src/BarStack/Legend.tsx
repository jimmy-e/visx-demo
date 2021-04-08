import React from 'react';
import { LegendOrdinal } from '@visx/legend';
import { ColorScale } from './types';
import * as styles from './BarStack.styles';

interface Props {
  colorScale: ColorScale;
}

const Legend: React.FC<Props> = ({ colorScale }) => {
  return (
    <div style={styles.legendStyle}>
      <LegendOrdinal scale={colorScale} direction="row" labelMargin="0 15px 0 0" />
    </div>
  );
}

export default Legend;
