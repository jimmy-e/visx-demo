import React from 'react';
import { Accessors, City } from 'organisms/XYChart/types';
import { RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';

interface Props {
  accessors: Accessors;
  // ToDo: replace `any` with correct datum typing
  colorScale: RenderTooltipParams<any>['colorScale'];
  hasSharedTooltip: boolean;
  renderHorizontally: boolean;
  // ToDo: replace `any` to correct typing
  tooltipData: any;
}

const CustomTooltip: React.FC<Props> = ({
  accessors,
  colorScale,
  hasSharedTooltip,
  renderHorizontally,
  tooltipData,
}) => (
  <>
    {/** date */}
    {(tooltipData?.nearestDatum?.datum &&
      accessors.date(tooltipData?.nearestDatum?.datum)) ||
    'No date'}
    <br />
    <br />
    {/** temperatures */}
    {((hasSharedTooltip
        ? Object.keys(tooltipData?.datumByKey ?? {})
        : [tooltipData?.nearestDatum?.key]
    ).filter(city => city) as City[]).map(city => {
      const temperature =
        tooltipData?.nearestDatum?.datum &&
        accessors[renderHorizontally ? 'x' : 'y'][city](
          tooltipData?.nearestDatum?.datum,
        );

      return (
        <div key={city}>
          <em
            style={{
              color: colorScale?.(city),
              textDecoration:
                tooltipData?.nearestDatum?.key === city ? 'underline' : undefined,
            }}
          >
            {city}
          </em>{' '}
          {temperature == null || Number.isNaN(temperature)
            ? '–'
            : `${temperature}° F`}
        </div>
      );
    })}
  </>
);

export default CustomTooltip;
