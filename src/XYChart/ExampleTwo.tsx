import React from 'react';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import ExampleControls, { ProvidedProps } from './ExampleControls';
import CustomChartBackground from './CustomChartBackground';

export type XYChartProps = {
  width: number;
  height: number;
};

type City = 'San Francisco' | 'New York' | 'Austin';

const SampleComponent: React.FC<ProvidedProps> = (props: object) => {
  console.log('***********');
  console.log(props);
  console.log('***********');
  return <h1>hello world</h1>;
};

const Example: React.FC<XYChartProps> = ({ height })  => {
  return (
    <ExampleControls>
      {(props) => (
          <SampleComponent {...props} />
      )}
    </ExampleControls>
  );
}

export default Example;
