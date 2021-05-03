import React, { useContext } from 'react';
import { PatternLines } from '@visx/pattern';
import { DataContext } from '@visx/xychart';

const ChartBackground: React.FC = () => {
  const { theme, margin, width, height, innerWidth, innerHeight } = useContext(DataContext);

  // early return values not available in context
  if (width == null || height == null || margin == null || theme == null) return null;

  const patternId = 'xy-chart-pattern';

  return (
    <>
      <PatternLines
        id={patternId}
        width={16}
        height={16}
        orientation={['diagonal']}
        stroke={theme?.gridStyles?.stroke}
        strokeWidth={1}
      />
      <rect x={0} y={0} width={width} height={height} fill={theme?.backgroundColor ?? '#fff'} />
      <rect
        x={margin.left}
        y={margin.top}
        width={innerWidth}
        height={innerHeight}
        fill={`url(#${patternId})`}
        fillOpacity={0.3}
      />
    </>
  );
}

export default ChartBackground;