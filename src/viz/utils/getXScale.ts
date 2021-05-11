import { scaleBand } from '@visx/scale';
import { BandScale, Config, Data, Index } from 'src/types';
import getValue from './getValue';

interface Props {
  data: Data;
  index: Index;
  xMax: Config['dimensions']['xMax'];
}

export default ({ data, index, xMax }: Props): BandScale => {
  const xScale = scaleBand<string>({
    domain: data.map((datum) => getValue(datum, index)),
    padding: 0.2,
  });

  xScale.rangeRound([0, xMax]);

  return xScale;
}
