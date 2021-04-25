import { XYChartConfig, XYChartProps } from './types';
import { getCurve, getData, getTheme } from './utils';

interface Props {
  barType: XYChartProps['barType'];
  curveType: XYChartProps['curveType'];
  hasFewerDatum: XYChartProps['hasFewerDatum'];
  hasMissingValues: XYChartProps['hasMissingValues'];
  lineType: XYChartProps['lineType'];
  orientation: XYChartProps['orientation'];
  themeType: XYChartProps['themeType'];
}

// Gets XYChart configurations
export default ({
  barType,
  curveType,
  hasFewerDatum,
  hasMissingValues,
  lineType,
  orientation,
  themeType,
}: Props): XYChartConfig => {
  const curve = getCurve(curveType);
  const data = getData(hasFewerDatum, hasMissingValues);
  const renderHorizontally = orientation === 'horizontal';
  const theme = getTheme(themeType);

  const animationTrajectory = 'center';

  const render = {
    areaSeries: lineType === 'area',
    areaStack: lineType === 'areaStack',
    barGroup: barType === 'group',
    barSeries: barType === 'default',
    barStack: barType === 'stack',
    lineSeries: lineType === 'default',
  };

  return {
    animationTrajectory,
    curve,
    data,
    render,
    renderHorizontally,
    theme,
  };
};
