import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { INITIAL_HEIGHT, INITIAL_WIDTH } from '../../constants';
import { initialPropsSlice, useVictoryState } from '../victory-state';
import * as React from 'react';

function createTestStore() {
  return configureStore({
    reducer: {
      initialProps: initialPropsSlice.reducer,
    },
  });
}

describe('useVictoryState', () => {
  let store;

  beforeEach(() => {
    // Resets the store to default values
    store = createTestStore();
  });

  function VictoryStateProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  it('returns default values', () => {
    const { result } = renderHook(() => useVictoryState(), {
      wrapper: VictoryStateProvider,
    });

    expect(result.current.height).toEqual(INITIAL_HEIGHT);
    expect(result.current.width).toEqual(INITIAL_WIDTH);
    expect(result.current.data).toEqual([]);
    expect(result.current.range).toEqual({ x: [0, 450], y: [300, 0] });
  });

  it('can set the initial props', () => {
    const { result } = renderHook(() => useVictoryState(), {
      wrapper: VictoryStateProvider,
    });

    act(() => {
      result.current.setInitialProps({
        height: 100,
        width: 200,
        data: [{ x: 1, y: 2 }],
      });
    });

    expect(result.current.height).toEqual(100);
    expect(result.current.width).toEqual(200);
    expect(result.current.data).toEqual([{ x: 1, y: 2 }]);
  });

  it('can set the data', () => {
    const { result } = renderHook(() => useVictoryState(), {
      wrapper: VictoryStateProvider,
    });

    act(() => {
      result.current.setData([
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ]);
    });

    expect(result.current.data).toHaveLength(2);
  });

  it('returns the domain based on the data', () => {
    const { result } = renderHook(() => useVictoryState(), {
      wrapper: VictoryStateProvider,
    });

    act(() => {
      result.current.setData([
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ]);
    });

    expect(result.current.domain).toEqual({
      x: [1, 3],
      y: [2, 4],
    });
  });

  it('returns the scale using the domain and range', () => {
    const { result } = renderHook(() => useVictoryState(), {
      wrapper: VictoryStateProvider,
    });

    act(() => {
      result.current.setData([
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ]);
    });

    const { scale } = result.current;

    expect(scale.x.domain()).toEqual([1, 3]);
    expect(scale.y.domain()).toEqual([2, 4]);

    expect(scale.x.range()).toEqual([0, 450]);
    expect(scale.y.range()).toEqual([300, 0]);

    expect(scale.x(1)).toEqual(0);
    expect(scale.y(1)).toEqual(450);
  });
});
