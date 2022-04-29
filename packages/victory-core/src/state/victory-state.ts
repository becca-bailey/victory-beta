import { useContextSelector } from 'use-context-selector';
import { ContextType, ForAxes, ScaleFn } from '../types';
import { VictoryContext } from './victory-state-provider';

export function useVictoryState() {
  const context = useContextSelector<ContextType, ContextType>(
    VictoryContext,
    context => context
  );

  if (!context) {
    throw new Error('useVictoryState must be used within a VictoryContext');
  }

  return context;
}
