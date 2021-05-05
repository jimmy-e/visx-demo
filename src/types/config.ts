export interface Config {
  dimensions: {
    height: number;
    width: number;
    xMax: number;
    yMax: number;
    margin: {
      bottom: number;
      left: number;
      right: number;
      top: number;
    };
  };
  theme: {
    background: {
      backgroundColor: string;
      radius: number;
    };
    colors: Record<string, string>;
    grid: {
      stroke: string;
      strokeOpacity: number;
    };
    tooltip: {
      background: string;
      color: string;
      minWidth: number;
    };
  };
}
