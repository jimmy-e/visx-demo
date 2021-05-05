import React from 'react';
import config from 'src/config';
import { Config } from 'src/types';

// Context State
interface ConfigState {
  config: Config;
}

// Initial Context State
const initialConfigState: ConfigState = {
  config,
};

// Context Object
const ConfigContext = React.createContext<ConfigState>(initialConfigState);

// Context Provider
export const ConfigContextProvider = (props: object): React.ReactElement => (
  <ConfigContext.Provider
    value={{
      config,
    }}
    {...props}
  />
);

// Use Context Hook
export const useConfigContext = (): ConfigState => React.useContext(ConfigContext);
