import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import BarStack from 'shapes/BarStack/BarStack';
import Tooltip from 'tools/Tooltip/Tooltip';
import XYChart from 'wrappers/XYChart/XYChart';
import { lightTheme } from '@visx/xychart';
import { Data, Datum } from 'organisms/XYChart/types';
import CustomTooltip from './CustomTooltip';

export interface Props {
  data: Data;
  height: number;
  width: number;
}

const HorizontalBarStackFull: React.FC<Props> = ({ data, height }) => {
  const theme = lightTheme;
  const axisConfig = {
    x: { type: 'linear' },
    y: { type: 'band', paddingInner: 0.3 },
  }
  const getSfTemperature = (datum: Datum) => Number(datum['San Francisco']);
  const getNyTemperature = (datum: Datum) => Number(datum['New York']);
  const getAustinTemperature = (datum: Datum) => Number(datum.Austin);
  const getDate = (datum: Datum) => datum.date;

  const accessors = {
    x: {
      Austin: getAustinTemperature,
      'New York': getNyTemperature,
      'San Francisco': getSfTemperature,
    },
    y: {
      Austin: getDate,
      'New York': getDate,
      'San Francisco': getDate,
    },
    date: getDate,
  };

  return (
    <XYChart
      theme={theme}
      xScale={axisConfig.x}
      yScale={axisConfig.y}
      height={Math.min(400, height)}
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
            renderHorizontally
            tooltipData={tooltipData}
          />
        )}
      />
    </XYChart>
  );
}

// ----- ADDING RESPONSIVENESS ----- //

interface ContainerProps {
  data: Data;
}

const HorizontalBarStackFullContainer: React.FC<ContainerProps> = (props) => (
  <ParentSize>
    {
      ({ height, width }) => (
        <HorizontalBarStackFull height={height} width={width} {...props} />
      )
    }
  </ParentSize>
);

export default HorizontalBarStackFullContainer;
