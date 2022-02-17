import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './victory-state';

const VictoryStateProvider: React.FunctionComponent = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default VictoryStateProvider;
