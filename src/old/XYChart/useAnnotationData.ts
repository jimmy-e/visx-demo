import { useEffect, useState } from 'react';
import { SetState, Datum } from 'organisms/XYChart/types';
import { XYChartProps } from './types';

interface Props {
  annotationKey: XYChartProps['annotationKey'];
  data: XYChartProps['data'];
}

interface Return {
  annotationDataIndex: number;
  annotationDataKey: XYChartProps['annotationKey'];
  annotationDatum: Datum;
  setAnnotationDataIndex: SetState<number>;
  setAnnotationDataKey: SetState<XYChartProps['annotationKey']>;
}

const defaultAnnotationDataIndex = 13;

export default ({ annotationKey, data }: Props): Return => {
  const [annotationDataIndex, setAnnotationDataIndex] = useState<number>(defaultAnnotationDataIndex);
  const [annotationDataKey, setAnnotationDataKey] = useState<XYChartProps['annotationKey']>(annotationKey);
  const annotationDatum = data[annotationDataIndex];

  useEffect(() => {
    setAnnotationDataKey(annotationKey);
  }, [annotationKey])

  return {
    annotationDataIndex,
    annotationDataKey,
    annotationDatum,
    setAnnotationDataIndex,
    setAnnotationDataKey,
  };
};
