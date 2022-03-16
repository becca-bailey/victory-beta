import { useContextSelector } from 'use-context-selector';
import { VictoryContext } from './victory-state-provider';
import { ContextType, Datum, ForAxes, ScaleFn } from '../types';

export function useChartData(id: string) {
  const data = useContextSelector<ContextType, Datum[]>(
    VictoryContext,
    ({ getData }) => getData(id)
  );

  const setData = useContextSelector<ContextType, (data: Datum[]) => void>(
    VictoryContext,
    ({ setData }) =>
      (data: Datum[]) =>
        setData(id, data)
  );

  return { data, setData };
}

export function useScale() {
  const scale = useContextSelector<ContextType, ForAxes<ScaleFn>>(
    VictoryContext,
    ({ scale }) => scale
  );
  return scale;
}

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
