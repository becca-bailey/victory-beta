import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './victory-state';

interface VictoryStateProviderProps {
  children: React.ReactNode;
}

const VictoryStateProvider: React.FunctionComponent<VictoryStateProviderProps> =
  ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

export default VictoryStateProvider;
