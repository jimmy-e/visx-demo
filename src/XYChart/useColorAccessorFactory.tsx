import { useCallback } from 'react';
import { DataKey } from 'src/types';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { XYChartConfig } from './types';

interface Props {
  annotationDataIndex: any;
  annotationDataKey: any;
  data: XYChartConfig['data'];
  selectedDatumPatternId: string;
}

type Return = (dataKey: DataKey) => (datum: CityTemperature) => string | null;

export default ({
  annotationDataIndex,
  annotationDataKey,
  data,
  selectedDatumPatternId,
}: Props): Return => {
  // for series that support it, return a colorAccessor which returns a custom color if the datum is
  // selected
  return useCallback(
    (dataKey: DataKey) => (datum: CityTemperature) =>
      annotationDataKey === dataKey && datum === data[annotationDataIndex]
        ? `url(#${selectedDatumPatternId})`
        : null,
    [annotationDataIndex, annotationDataKey],
  );
}
