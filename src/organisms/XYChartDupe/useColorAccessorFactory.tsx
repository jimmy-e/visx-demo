import { useCallback } from 'react';
import { DataKey, Datum } from 'src/types';
import { XYChartProps } from './types';

interface Props {
  annotationDataIndex: any;
  annotationDataKey: any;
  data: XYChartProps['data'];
  selectedDatumPatternId: string;
}

type Return = (dataKey: DataKey) => (datum: Datum) => string | null;

export default ({
  annotationDataIndex,
  annotationDataKey,
  data,
  selectedDatumPatternId,
}: Props): Return => {
  // for series that support it, return a colorAccessor which returns a custom color if the datum is
  // selected
  return useCallback(
    (dataKey: DataKey) => (datum: Datum) =>
      annotationDataKey === dataKey && datum === data[annotationDataIndex]
        ? `url(#${selectedDatumPatternId})`
        : null,
    [annotationDataIndex, annotationDataKey],
  );
}
