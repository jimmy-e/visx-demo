import React from 'react';
import Bars from './Bars/Bars';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

const App: React.FC = () => (
  <ParentSize>{({ width, height }) => <Bars />}</ParentSize>
);

export default App;
