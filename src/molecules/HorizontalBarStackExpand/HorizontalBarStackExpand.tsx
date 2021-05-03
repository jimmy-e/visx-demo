import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import BarStack from 'shapes/BarStack/BarStack';
import Tooltip from 'tools/Tooltip/Tooltip';
import VisxXYChart from 'molecules/XYChart/XYChart';
import { lightTheme } from '@visx/xychart';
import CustomTooltip from './CustomTooltip';
import useAccessors from './useAccessors';
import useAnnotationData from './useAnnotationData';
import useAxisConfig from './useAxisConfig';
import { XYChartProps } from './types';
import { getData } from './utils';
import './xyChart.css';

interface Props extends XYChartProps {
  height: number;
  width: number;
}

const HorizontalBarStackExpand: React.FC<Props> = ({
  annotationKey,
  data,
  editAnnotationLabelPosition,
  hasNegativeValues,
  hasSharedTooltip,
  height,
  isAnimated,
  stackOffset,
}) => {
  const theme = lightTheme;

  const renderHorizontally = true;

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

const HorizontalBarStackExpandContainer: React.FC<XYChartProps> = (props) => (
  <ParentSize>
    {
      ({ height, width }) => (
        <HorizontalBarStackExpand height={height} width={width} {...props} />
      )
    }
  </ParentSize>
);

export default HorizontalBarStackExpandContainer;
