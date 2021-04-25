import { useEffect, useState } from 'react';
import { CityTemperature, SetState } from 'src/types';
import { XYChartConfig, XYChartProps } from './types';

interface Props {
  annotationKey: XYChartProps['annotationKey'];
  data: XYChartConfig['data'];
}

interface Return {
  annotationDataIndex: number;
  annotationDataKey: XYChartProps['annotationKey'];
  annotationDatum: CityTemperature;
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
