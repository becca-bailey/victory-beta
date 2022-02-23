import { act, renderHook } from '@testing-library/react-hooks';
import { useVictoryState } from '../victory-state';
import VictoryStateProvider from '../victory-state-provider';
import { INITIAL_HEIGHT, INITIAL_WIDTH } from '../constants';

describe('useVictoryState', () => {
  it('returns default values', () => {
    const { result } = renderHook(() => useVictoryState(), {
      wrapper: VictoryStateProvider,
    });

    expect(result.current.height).toEqual(INITIAL_HEIGHT);
    expect(result.current.width).toEqual(INITIAL_WIDTH);
    expect(result.current.data).toEqual([]);
    expect(result.current.range).toEqual({ x: [0, 450], y: [300, 0] });
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

  // Test scale functions
});
