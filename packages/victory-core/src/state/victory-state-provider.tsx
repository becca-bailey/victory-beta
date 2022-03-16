import * as d3 from 'd3';
import * as React from 'react';
import { createContext } from 'use-context-selector';
import {
  ChartComponentProps,
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

type Action = { type: 'setData'; data: Datum[]; id: string };

function reducer(state: StateType, action: Action) {
  switch (action.type) {
    case 'setData': {
      const { data, id } = action;
      return {
        ...state,
        chartStates: {
          ...state.chartStates,
          [id]: {
            ...state.chartStates[id],
            data,
          },
        },
      };
    }
    default:
      throw new Error(`Unrecognized action type: ${action.type}`);
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
      const { x, y } = range;
      const { x: xDomain, y: yDomain } = domain;
      return {
        x: d3.scaleLinear().domain(xDomain).range(x),
        y: d3.scaleLinear().domain(yDomain).range(y),
      };
    }, [range, domain]);

    const setData = React.useCallback(
      (id: string, data: Datum[]) => {
        dispatch({ type: 'setData', data, id });
      },
      [dispatch]
    );

    const getData = React.useCallback(
      (id: string) => {
        return state.chartStates[id]?.data || [];
      },
      [state.chartStates]
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
    };

    return (
      <VictoryContext.Provider value={value}>
        {children}
      </VictoryContext.Provider>
    );
  };

export default VictoryStateProvider;
