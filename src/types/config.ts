import { ShapeType } from './shapes';

type Shapes = Record<ShapeType, { colors: string[]; }>

interface Theme {
  background: {
    backgroundColor: string;
    radius: number;
  };
  colors: Record<string, string>;
  grid: {
    stroke: string;
    strokeOpacity: number;
  };
  shapes: Shapes;
  tooltip: {
    background: string;
    color: string;
    minWidth: number;
  };
}

export interface Config {
  margin: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  theme: Theme;
}
