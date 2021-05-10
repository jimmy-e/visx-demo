import { scaleLinear } from '@visx/scale';
import { Data, LinearScale } from 'src/types';
import getKeys from 'utils/getKeys';

export default (data: Data, index: string, yMax: number): LinearScale => {
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

  const yScale = scaleLinear<number>({
    domain: [0, Math.max(...values)],
    nice: true,
  });

  yScale.range([yMax, 0]);

  return yScale;
};

