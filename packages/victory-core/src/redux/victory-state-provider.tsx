import * as React from 'react';
import { Provider } from 'react-redux';
import { initialPropsSlice } from './victory-state';
import { configureStore } from '@reduxjs/toolkit';
import { CommonProps } from '../types';

const defaultProps: CommonProps = {
  data: [],
  width: 450,
  height: 300,
  padding: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};

const VictoryStateProvider: React.FunctionComponent<CommonProps> = ({
  children,
  ...props
}) => {
  const initialProps = {
    ...defaultProps,
    ...props,
  };
  const store = configureStore({
    reducer: {
      initialProps: initialPropsSlice.reducer,
    },
    preloadedState: {
      initialProps,
    },
  });
  return <Provider store={store}>{children}</Provider>;
};

export default VictoryStateProvider;
