import { scaleBand } from '@visx/scale';
import { BandScale, Data } from 'src/types';
import getValue from './getValue';

interface Props {
  data: Data;
  index: string;
  xMax: number;
}

export default ({ data, index, xMax }: Props): BandScale => {
  const xScale = scaleBand<string>({
    domain: data.map((datum) => getValue(datum, index)),
    padding: 0.2,
  });

  xScale.rangeRound([0, xMax]);

  return xScale;
}
