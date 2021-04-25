import { AnimationTrajectory } from '@visx/react-spring/lib/types';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { CurveFactory } from 'd3-shape';
import { XYChartTheme } from '@visx/xychart';
import { XYChartProps } from './types';
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

interface Return {
  animationTrajectory: AnimationTrajectory;
  curve: CurveFactory;
  data: CityTemperature[];
  glyphOutline: string;
  render: {
    areaSeries: boolean;
    areaStack: boolean;
    barGroup: boolean;
    barSeries: boolean;
    barStack: boolean;
    lineSeries: boolean;
  },
  renderHorizontally: boolean;
  theme: XYChartTheme;
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
}: Props): Return => {
  const curve = getCurve(curveType);
  const data = getData(hasFewerDatum, hasMissingValues);
  const renderHorizontally = orientation === 'horizontal';
  const theme = getTheme(themeType);

  const animationTrajectory = 'center';
  const glyphOutline = theme.gridStyles.stroke as string;

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
    glyphOutline,
    render,
    renderHorizontally,
    theme,
  };
};
