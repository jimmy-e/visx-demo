import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { CityName, ColorScale, DateScale, TemperatureScale } from './types';
import { getDate, getKeys } from './utils';
import config from './config';

export const getColorScale = (data: CityTemperature[]): ColorScale => {
  const { purple1, purple2, purple3 } = config.theme.colors;

  const keys = getKeys(data);

  return scaleOrdinal<CityName, string>({
    domain: keys,
    range: [purple1, purple2, purple3],
  });
};

export const getDateScale = (data: CityTemperature[]): DateScale => {
  const dateScale = scaleBand<string>({
    domain: data.map(getDate),
    padding: 0.2,
  });

  dateScale.rangeRound([0, config.dimensions.xMax]);

  return dateScale;
}

export const getTemperatureScale = (data: CityTemperature[]): TemperatureScale => {
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

