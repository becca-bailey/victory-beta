import * as d3 from 'd3';
import React from 'react';
import { useContextSelector } from 'use-context-selector';
import { Datum, ChartState, ContextType } from '../types';
import { VictoryContext } from './victory-state-provider';

export function useChartState(id: string) {
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

  const { animating, previousData, nextData, duration } = useContextSelector<
    ContextType,
    ChartState
  >(VictoryContext, ({ getState }) => {
    return getState(id);
  });

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

  return {
    data,
    setData,
    shouldStartAnimating,
    startTransition,
    endTransition,
  };
}
