import { renderHook } from '@testing-library/react-hooks';
import { useVictoryState } from '../victory-state';
import VictoryStateProvider from '../victory-state-provider';
import { INITIAL_HEIGHT, INITIAL_WIDTH } from '../constants';

describe('useVictoryState', () => {
  it('returns default values', () => {
    const { result } = renderHook(() => useVictoryState(), {
      wrapper: VictoryStateProvider,
    });

    expect(result.current.domain).toEqual({ x: [], y: [] });
    expect(result.current.height).toEqual(INITIAL_HEIGHT);
    expect(result.current.width).toEqual(INITIAL_WIDTH);
  });
});
