import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { PatternLines } from '@visx/pattern';
import BarStack from 'shapes/BarStack/BarStack';
import ChartBackground from 'atoms/backgrounds/ChartBackground';
import Grid from 'tools/Grid/Grid';
import Tooltip from 'tools/Tooltip/Tooltip';
import VisxXYChart from 'molecules/XYChart/XYChart';
import CustomTooltip from './CustomTooltip';
import getConfig from './getConfig';
import useAccessors from './useAccessors';
import useAnnotationData from './useAnnotationData';
import useAxisConfig from './useAxisConfig';
import { XYChartProps } from './types';
import { getData } from './utils';
import './xyChart.css';

const numTicks = 4;
const selectedDatumPatternId = 'xychart-selected-datum';

interface Props extends XYChartProps {
  height: number;
  width: number;
}

const XYChart: React.FC<Props> = ({
  annotationKey,
  barType,
  curveType,
  data: initialData,
  editAnnotationLabelPosition,
  hasFewerDatum,
  hasMissingValues,
  hasNegativeValues,
  hasSharedTooltip,
  height,
  isAnimated,
  lineType,
  showGridColumns,
  showGridRows,
  showHorizontalCrosshair,
  showTooltip,
  showVerticalCrosshair,
  snapTooltipToDatumX,
  snapTooltipToDatumY,
  stackOffset,
  themeType,
}) => {
  const { render, theme } = getConfig({ barType, curveType, lineType, themeType });

  const renderHorizontally = true;

  const data = getData(initialData, hasFewerDatum, hasMissingValues);

  const { setAnnotationDataIndex, setAnnotationDataKey } = useAnnotationData({ annotationKey, data });

  const axisConfig = useAxisConfig(renderHorizontally);

  const accessors = useAccessors({ hasNegativeValues, renderHorizontally });

  return (
    <>
      <div>
        <br />
      </div>
      <VisxXYChart
        theme={theme}
        xScale={axisConfig.x}
        yScale={axisConfig.y}
        height={Math.min(400, height)}
        captureEvents={!editAnnotationLabelPosition}
        onPointerUp={d => {
          setAnnotationDataKey(d.key as 'New York' | 'San Francisco' | 'Austin');
          setAnnotationDataIndex(d.index);
        }}
      >
        <BarStack
          accessors={accessors}
          data={data}
          isAnimated={isAnimated}
          stackOffset={stackOffset}
        />
        <Tooltip
          renderTooltip={({ tooltipData, colorScale }) => (
            <CustomTooltip
              accessors={accessors}
              colorScale={colorScale}
              hasSharedTooltip={hasSharedTooltip}
              renderHorizontally={renderHorizontally}
              tooltipData={tooltipData}
            />
          )}
        />
      </VisxXYChart>
    </>
  );
}

// ----- ADDING RESPONSIVENESS ----- //

const XYChartResponsiveContainer: React.FC<XYChartProps> = (props) => (
  <ParentSize>
    {
      ({ height, width }) => (
        <XYChart height={height} width={width} {...props} />
      )
    }
  </ParentSize>
);

export default XYChartResponsiveContainer;
