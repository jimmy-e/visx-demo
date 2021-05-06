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
    colors: {
      colorOne: string;
      colorTwo: string;
      colorThree: string;
    };
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
