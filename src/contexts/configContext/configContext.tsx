import React from 'react';
import { Config } from 'src/types';
import defaultConfig from './defaultConfig';

// Context State
interface ConfigState {
  config: Config;
}

// Initial Context State
const initialConfigState: ConfigState = {
  config: defaultConfig,
};

// Context Object
const ConfigContext = React.createContext<ConfigState>(initialConfigState);

// Context Provider
export const ConfigContextProvider = (props: object): React.ReactElement => (
  <ConfigContext.Provider
    value={{
      config: defaultConfig,
    }}
    {...props}
  />
);

// Use Context Hook
export const useConfigContext = (): ConfigState => React.useContext(ConfigContext);
