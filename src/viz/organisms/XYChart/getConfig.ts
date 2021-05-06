import { XYChartConfig, XYChartProps } from './types';
import { getCurve, getTheme } from './utils';

interface Props {
  barType: XYChartProps['barType'];
  curveType: XYChartProps['curveType'];
  lineType: XYChartProps['lineType'];
  orientation: XYChartProps['orientation'];
  themeType: XYChartProps['themeType'];
}

// Gets XYChart configurations
export default ({
  barType,
  curveType,
  lineType,
  orientation,
  themeType,
}: Props): XYChartConfig => {
  const curve = getCurve(curveType);
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
    render,
    renderHorizontally,
    theme,
  };
};