export interface Config {
  margin: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  theme: {
    background: {
      backgroundColor: string;
      radius: number;
    };
    colors: {
      default: {
        colorOne: string;
        colorTwo: string;
        colorThree: string;
      };
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
