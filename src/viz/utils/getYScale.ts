import { scaleLinear } from '@visx/scale';
import { Config, Data, Index, Offset, LinearScale } from 'src/types';
import getKeys from 'utils/getKeys';

interface Props {
  data: Data;
  index: Index;
  offset: Offset;
  yMax: Config['dimensions']['yMax'];
}

export default ({ data, index, offset, yMax }: Props): LinearScale => {
  let yScale: LinearScale;

  if (offset === 'expand') {
    yScale = scaleLinear<number>({
      domain: [0, 1],
      nice: true,
    });
  } else {
    const keys = getKeys(data, index);

    // ToDo: I could probably come up with better parameter names
    const values = data.reduce((totals, item) => {
      const total = keys.reduce((keyTotal, index) => {
        keyTotal += Number(item[index]);
        return keyTotal;
      }, 0);
      totals.push(total);
      return totals;
    }, [] as number[]);

    yScale = scaleLinear<number>({
      domain: [0, Math.max(...values)],
      nice: true,
    });
  }

  yScale.range([yMax, 0]);

  return yScale;
};
