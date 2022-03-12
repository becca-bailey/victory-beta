import * as d3 from 'd3';
import { useContextSelector } from 'use-context-selector';
import { Datum, ForAxes, Range } from '../types';
import { ContextType, VictoryContext } from './victory-state-provider';

export interface StateType {}

export function useVictoryState() {
  const context = useContextSelector(VictoryContext, context => context);

  if (!context) {
    throw new Error('useVictoryState must be used within a VictoryContext');
  }

  const [state, setState] = context;

  const setData = (id: string, data: Datum[]) => {
    setState(s => ({ ...s, data: { ...s.data, [id]: data } }));
  };

  const getData = (id: string) => state.data[id];

  // Calculated values

  const allData = useContextSelector<ContextType, Datum[]>(
    VictoryContext,
    ([{ data }]) => Object.values(data).reduce((acc, d) => acc.concat(d), [])
  );

  const range = useContextSelector<ContextType, ForAxes<Range>>(
    VictoryContext,
    ([{ width, height, padding }]) => {
      return {
        x: [padding.left, width - padding.right],
        y: [height - padding.bottom, padding.top],
      };
    }
  );

  // Do these need to be memoized?
  const domain = {
    x: d3.extent(allData.map(({ x }) => x)),
    y: d3.extent(allData.map(({ y }) => y)),
  };

  const scale = {
    x: d3.scaleLinear().domain(domain.x).range(range.x),
    y: d3.scaleLinear().domain(domain.y).range(range.y),
  };

  return { setData, getData, domain, range, scale, ...state };
}
