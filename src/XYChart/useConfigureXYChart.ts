import { AnimationTrajectory } from '@visx/react-spring/lib/types';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { CurveFactory } from 'd3-shape';
import { XYChartTheme } from '@visx/xychart';
import { XYChartProps } from './types';
import { getCurve, getData, getTheme } from './utils';

interface Props {
  curveType: XYChartProps['curveType'];
  hasFewerDatum: XYChartProps['hasFewerDatum'];
  hasMissingValues: XYChartProps['hasMissingValues'];
  orientation: XYChartProps['orientation'];
  themeType: XYChartProps['themeType'];
}

interface Return {
  animationTrajectory: AnimationTrajectory;
  curve: CurveFactory;
  data: CityTemperature[];
  glyphOutline: string;
  renderHorizontally: boolean;
  theme: XYChartTheme;
}

// Gets XYChart configurations
export default ({
  curveType,
  hasFewerDatum,
  hasMissingValues,
  orientation,
  themeType,
}: Props): Return => {
  const curve = getCurve(curveType);
  const data = getData(hasFewerDatum, hasMissingValues);
  const renderHorizontally = orientation === 'horizontal';
  const theme = getTheme(themeType);

  const animationTrajectory = 'center';
  const glyphOutline = theme.gridStyles.stroke as string;

  return {
    animationTrajectory,
    curve,
    data,
    glyphOutline,
    renderHorizontally,
    theme,
  };
};
