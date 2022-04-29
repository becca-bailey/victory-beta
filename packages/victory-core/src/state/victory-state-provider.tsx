import * as d3 from 'd3';
import * as React from 'react';
import { createContext } from 'use-context-selector';
import {
  ChartComponentProps,
  ChartState,
  ContextType,
  Datum,
  Extent,
  StateType,
} from '../types';

interface VictoryStateProviderProps {
  children: React.ReactNode;
  initialProps?: ChartComponentProps;
}

export const VictoryContext = createContext(null);

const DEFAULT_STATE: ChartState = { data: [] };

type Action =
  | { type: 'setData'; data: Datum[]; id: string }
  | {
      type: 'startTransition';
      id: string;
      from: Datum[];
      to: Datum[];
      duration: number;
    }
  | {
      type: 'endTransition';
      id: string;
    };

function reducer(state: StateType, action: Action) {
  switch (action.type) {
    case 'setData': {
      const { data, id } = action;
      const chartState = state.chartStates[id];
      return {
        ...state,
        chartStates: {
          ...state.chartStates,
          [id]: {
            ...chartState,
            data,
          },
        },
      };
    }
    case 'startTransition': {
      const { id, from, to, duration } = action;
      const chartState = state.chartStates[id];
      return {
        ...state,
        chartStates: {
          ...state.chartStates,
          [id]: {
            ...chartState,
            animating: true,
            previousData: from,
            nextData: to,
            duration,
          },
        },
      };
    }
    case 'endTransition': {
      const { id } = action;
      const chartState = state.chartStates[id];
      return {
        ...state,
        chartStates: {
          ...state.chartStates,
          [id]: {
            ...chartState,
            animating: false,
            data: chartState.nextData,
          },
        },
      };
    }
    default:
      throw new Error(`Unrecognized action type: ${(action as Action).type}`);
  }
}

const VictoryStateProvider: React.FunctionComponent<VictoryStateProviderProps> =
  ({ children, initialProps = {} }) => {
    const props = {
      width: 450,
      height: 300,
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      ...initialProps,
    };

    const initialState: StateType = {
      ...props,
      chartStates: {},
    };
    const { padding, width, height } = props;

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const allData = React.useMemo(() => {
      return Object.values(state.chartStates).reduce(
        (acc, chartState) => [...acc, ...chartState.data],
        []
      );
    }, [state.chartStates]);

    const range = React.useMemo(() => {
      if (props.range) {
        return props.range;
      }
      return {
        x: [padding.left, width - padding.right] as Extent,
        y: [height - padding.bottom, padding.top] as Extent,
      };
    }, [padding, width, height, props.range]);

    const domain = React.useMemo(() => {
      if (props.domain) {
        return props.domain;
      }
      return {
        x: d3.extent(allData.map(({ x }) => x)),
        y: d3.extent(allData.map(({ y }) => y)),
      };
    }, [allData, props.domain]);

    const scale = React.useMemo(() => {
      if (props.scale) {
        return props.scale;
      }
      const { x, y } = range;
      const { x: xDomain, y: yDomain } = domain;
      return {
        x: d3.scaleLinear().domain(xDomain).range(x),
        y: d3.scaleLinear().domain(yDomain).range(y),
      };
    }, [range, domain]);

    // TODO: This can be chart-specific
    const animate = React.useMemo(() => {
      if (typeof props.animate === 'boolean' && props.animate === true) {
        return {
          duration: 500,
        };
      }
      return props.animate || undefined;
    }, [props.animate]);

    const setData = React.useCallback(
      (id: string, data: Datum[]) => {
        dispatch({ type: 'setData', data, id });
      },
      [dispatch]
    );

    const getState = React.useCallback<(id: string) => ChartState>(
      (id: string) => {
        return state.chartStates[id] || DEFAULT_STATE;
      },
      [state.chartStates]
    );

    const getData = React.useCallback<(id: string) => Datum[]>(
      (id: string) => {
        const state = getState(id);
        return state.data;
      },
      [getState]
    );

    const startTransition = React.useCallback(
      (id: string, data: Datum[]) => {
        if (!animate) {
          return;
        }
        dispatch({
          type: 'startTransition',
          id,
          from: getData(id),
          to: data,
          duration: animate.duration,
        });
      },
      [dispatch, getData, animate]
    );

    const endTransition = React.useCallback(
      (id: string) => {
        dispatch({
          type: 'endTransition',
          id,
        });
      },
      [dispatch, getData, animate]
    );

    const shouldStartAnimating = React.useCallback(
      id => {
        const chartState = state.chartStates[id];
        if (!chartState || !animate) {
          return false;
        }
        return !chartState.animating;
      },
      [state, animate]
    );

    const isAnimating = React.useCallback(
      id => {
        const chartState = state.chartStates[id];
        return chartState?.animating;
      },
      [state]
    );

    const value: ContextType = {
      domain,
      scale,
      range,
      setData,
      getData,
      padding,
      width,
      height,
      animate,
      startTransition,
      endTransition,
      shouldStartAnimating,
      isAnimating,
      getState,
    };

    return (
      <VictoryContext.Provider value={value}>
        {children}
      </VictoryContext.Provider>
    );
  };

export default VictoryStateProvider;
