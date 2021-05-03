import { useState } from 'react';
import { Data, Datum, SetState } from 'src/types';

interface Return {
  annotationDataIndex: number;
  annotationDataKey: string;
  annotationDatum: Datum;
  setAnnotationDataIndex: SetState<number>;
  setAnnotationDataKey: SetState<string>;
}

export default (data: Data): Return => {
  const [annotationDataIndex, setAnnotationDataIndex] = useState<number>(0);
  const [annotationDataKey, setAnnotationDataKey] = useState<string>('');
  const annotationDatum = data[annotationDataIndex];

  return {
    annotationDataIndex,
    annotationDataKey,
    annotationDatum,
    setAnnotationDataIndex,
    setAnnotationDataKey,
  };
};
