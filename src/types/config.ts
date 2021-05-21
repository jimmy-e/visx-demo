import { ShapeType } from './shapes';

type Shapes = Record<ShapeType, { colors: string[]; }>
interface Tools {
  axis: {
    color: string;
    fontSize: number;
  },
  background: {
    backgroundColor: string;
    radius: number;
  };
  grid: {
    stroke: string;
    strokeOpacity: number;
  };
  tooltip: {
    backgroundColor: string;
    color: string;
    minWidth: number;
  };
}

interface Theme {
  colors: Record<string, string>;
  shapes: Shapes;
  tools: Tools;
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
