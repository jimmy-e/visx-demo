import React from 'react';

// Context State
interface ConfigState {
  foo: string;
}

// Initial Context State
const initialConfigState: ConfigState = {
  foo: '',
};

// Context Object
const ConfigContext = React.createContext<ConfigState>(initialConfigState);

// Context Provider
export const ConfigContextProvider = (props: object): React.ReactElement => (
  <ConfigContext.Provider
    value={{
      foo: 'bar',
    }}
    {...props}
  />
);

// Use Context Hook
export const useConfigContext = (): ConfigState => React.useContext(ConfigContext);
