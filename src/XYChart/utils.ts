import { lightTheme, darkTheme, XYChartTheme } from '@visx/xychart';
import customTheme from './customTheme';

// ToDo: change from any to correct prop
export const getTheme = (themeType: any): XYChartTheme => {
  switch (themeType) {
    case 'custom':
      return customTheme;
    case 'dark':
      return darkTheme;
    case 'light':
      return lightTheme;
    default:
      throw Error('invalid theme type');
  }
}
