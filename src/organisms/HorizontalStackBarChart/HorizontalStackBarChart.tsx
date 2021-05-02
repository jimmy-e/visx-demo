import React from 'react';
import XYChart from 'organisms/XYChart/XYChart';

const HorizontalStackBarChart: React.FC = () => (
  <XYChart
    annotationType="circle"
    barType="stack"
    curveType="linear"
    editAnnotationLabelPosition={false}
    hasFewerDatum={false}
    hasMissingValues={false}
    hasNegativeValues={false}
    hasSharedTooltip={true}
    isAnimated={false}
    orientation="horizontal"
    showTooltip={true}
    showGridColumns={false}
    showGridRows={false}
    showHorizontalCrosshair={false}
    showVerticalCrosshair={false}
    snapTooltipToDatumX={true}
    snapTooltipToDatumY={true}
    stackOffset="expand"
    themeType="light"
    xAxisOrientation="bottom"
    yAxisOrientation="left"
  />
);

export default HorizontalStackBarChart;
