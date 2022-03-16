import { act, renderHook } from '@testing-library/react-hooks';
import { INITIAL_HEIGHT, INITIAL_WIDTH } from '../../constants';
import { useVictoryState } from '../victory-state';
import VictoryStateProvider from '../victory-state-provider';
import * as React from 'react';

describe('useVictoryState', () => {
  it('returns default values', () => {
    const { result } = renderHook(() => useVictoryState(), {
      wrapper: VictoryStateProvider,
    });

    expect(result.current.height).toEqual(INITIAL_HEIGHT);
    expect(result.current.width).toEqual(INITIAL_WIDTH);
    expect(result.current.padding).toEqual({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    });
    expect(result.current.range).toEqual({ x: [0, 450], y: [300, 0] });
  });

  it('can set the data', () => {
    const { result } = renderHook(() => useVictoryState(), {
      wrapper: VictoryStateProvider,
    });

    act(() => {
      result.current.setData('id', [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ]);
    });

    expect(result.current.getData('id')).toHaveLength(2);
  });

  it('returns the domain based on the data', () => {
    const { result } = renderHook(() => useVictoryState(), {
      wrapper: VictoryStateProvider,
    });

    act(() => {
      result.current.setData('id', [
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
      result.current.setData('id', [
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
