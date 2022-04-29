import { useContextSelector } from 'use-context-selector';
import { VictoryContext } from './victory-state-provider';
import { ChartState, ContextType, Datum, ForAxes, ScaleFn } from '../types';
import React from 'react';
import * as d3 from 'd3';

export function useChartData(id: string) {
  const data = useContextSelector<ContextType, Datum[]>(
    VictoryContext,
    ({ getData }) => {
      return getData(id);
    }
  );

  const setData = useContextSelector<ContextType, (data: Datum[]) => void>(
    VictoryContext,
    ({ setData }) => {
      return (data: Datum[]) => setData(id, data);
    }
  );

  return { data, setData };
}

export function useAnimationState(id: string) {
  const shouldStartAnimating = useContextSelector<ContextType, boolean>(
    VictoryContext,
    ({ shouldStartAnimating }) => {
      return shouldStartAnimating(id);
    }
  );

  const startTransition = useContextSelector<
    ContextType,
    (data: Datum[]) => void
  >(VictoryContext, ({ startTransition }) => {
    return (data: Datum[]) => startTransition(id, data);
  });

  const endTransition = useContextSelector<ContextType, () => void>(
    VictoryContext,
    ({ endTransition }) => {
      return () => endTransition(id);
    }
  );

  const setData = useContextSelector<ContextType, (data: Datum[]) => void>(
    VictoryContext,
    ({ setData }) => {
      return (data: Datum[]) => setData(id, data);
    }
  );

  const state = useContextSelector<ContextType, ChartState>(
    VictoryContext,
    ({ getState }) => {
      return getState(id);
    }
  );

  const { animating, previousData, nextData, duration } = state;

  React.useEffect(() => {
    if (animating) {
      const interpolator = d3.interpolate(previousData, nextData);
      const timer = d3.timer(elapsed => {
        const step = elapsed / duration;
        if (elapsed > duration) {
          timer.stop();
          setData(interpolator(1));
          endTransition();
        } else {
          setData(interpolator(step) || []);
        }
      });
      return () => {
        timer.stop();
      };
    }
  }, [animating, duration]);

  return { shouldStartAnimating, startTransition, endTransition };
}

export function useScale() {
  return useContextSelector<ContextType, ForAxes<ScaleFn>>(
    VictoryContext,
    ({ scale }) => scale
  );
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
