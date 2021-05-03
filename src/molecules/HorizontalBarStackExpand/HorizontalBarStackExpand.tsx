import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import BarStack from 'shapes/BarStack/BarStack';
import Tooltip from 'tools/Tooltip/Tooltip';
import XYChart from 'molecules/XYChart/XYChart';
import { lightTheme } from '@visx/xychart';
import CustomTooltip from './CustomTooltip';
import useAccessors from './useAccessors';
import useAnnotationData from './useAnnotationData';
import useAxisConfig from './useAxisConfig';
import { Data } from 'src/types';

interface Props {
  data: Data;
  height: number;
  width: number;
}

const HorizontalBarStackExpand: React.FC<Props> = ({ data, height }) => {
  const theme = lightTheme;
  const renderHorizontally = true;
  const { setAnnotationDataIndex, setAnnotationDataKey } = useAnnotationData(data);
  const axisConfig = useAxisConfig(renderHorizontally);
  const accessors = useAccessors();

  return (
    <>
      <div>
        <br />
      </div>
      <XYChart
        theme={theme}
        xScale={axisConfig.x}
        yScale={axisConfig.y}
        height={Math.min(400, height)}
        onPointerUp={(datum) => {
          setAnnotationDataKey(datum.key as 'New York' | 'San Francisco' | 'Austin');
          setAnnotationDataIndex(datum.index);
        }}
      >
        <BarStack
          accessors={accessors}
          data={data}
          offset="expand"
        />
        <Tooltip
          renderTooltip={({ tooltipData, colorScale }) => (
            <CustomTooltip
              accessors={accessors}
              colorScale={colorScale}
              hasSharedTooltip
              renderHorizontally={renderHorizontally}
              tooltipData={tooltipData}
            />
          )}
        />
      </XYChart>
    </>
  );
}

// ----- ADDING RESPONSIVENESS ----- //

interface ContainerProps {
  data: Data;
}

const HorizontalBarStackExpandContainer: React.FC<ContainerProps> = (props) => (
  <ParentSize>
    {
      ({ height, width }) => (
        <HorizontalBarStackExpand height={height} width={width} {...props} />
      )
    }
  </ParentSize>
);

export default HorizontalBarStackExpandContainer;
