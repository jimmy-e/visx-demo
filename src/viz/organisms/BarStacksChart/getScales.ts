import { scaleLinear } from '@visx/scale';
import { Data } from 'organisms/XYChart/types';
import { TemperatureScale } from './types';
import { getKeys } from './utils';
// todo: replace this config import
import config from 'contexts/configContext/defaultConfig';

export const getTemperatureScale = (data: Data): TemperatureScale => {
  const keys = getKeys(data);

  const temperatureTotals = data.reduce((allTotals, currentDate) => {
    const totalTemperature = keys.reduce((dailyTotal, index) => {
      dailyTotal += Number(currentDate[index]);
      return dailyTotal;
    }, 0);
    allTotals.push(totalTemperature);
    return allTotals;
  }, [] as number[]);

  const temperatureScale = scaleLinear<number>({
    domain: [0, Math.max(...temperatureTotals)],
    nice: true,
  });

  temperatureScale.range([config.dimensions.yMax, 0]);

  return temperatureScale;
};

