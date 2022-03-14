import * as React from 'react';
import { INITIAL_HEIGHT, INITIAL_WIDTH } from '../constants';
import { StateType } from '../types';
import { createContext } from 'use-context-selector';

interface VictoryStateProviderProps {
  children: React.ReactNode;
  initialProps?: Partial<StateType>;
}

export const VictoryContext = createContext(null);

const defaults: StateType = {
  width: INITIAL_WIDTH,
  height: INITIAL_HEIGHT,
  data: {},
  padding: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};

export type ContextType = [
  StateType,
  React.Dispatch<React.SetStateAction<StateType>>
];

const VictoryStateProvider: React.FunctionComponent<VictoryStateProviderProps> =
  ({ children, initialProps = {} }) => {
    const contextValue = React.useState<StateType>({
      ...initialProps,
      ...defaults,
    });
    return (
      <VictoryContext.Provider value={contextValue}>
        {children}
      </VictoryContext.Provider>
    );
  };

export default VictoryStateProvider;
