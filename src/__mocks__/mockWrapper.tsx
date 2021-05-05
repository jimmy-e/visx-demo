import React from 'react';
import { ConfigContextProvider } from 'contexts/configContext/configContext';

const MockWrapper: React.FC = ({ children }) => (
  <ConfigContextProvider>
    {children}
  </ConfigContextProvider>
);

export default MockWrapper;
