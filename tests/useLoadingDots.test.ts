import { act, renderHook } from '@testing-library/react-hooks';
import { useLoadingDots } from '../src';

beforeAll(() => {
  jest.useFakeTimers();
});

describe('useLoadingDots', () => {
  it('initial', () => {
    const { result } = renderHook(() => useLoadingDots({}));

    expect(result.current.count).toBe(0);
  });

  it('maxCount arg', () => {
    const { result } = renderHook(() => useLoadingDots({ maxCount: 4 }));

    act(() => {
      result.current.start();
      jest.runTimersToTime(2000);
    });

    expect(result.current.count).toBe(4);

    act(() => {
      jest.runTimersToTime(500);
    });

    expect(result.current.count).toBe(0);
  });

  it('intervalMs arg', () => {
    const { result } = renderHook(() => useLoadingDots({ intervalMs: 1000 }));

    act(() => {
      result.current.start();
      jest.runTimersToTime(500);
    });

    expect(result.current.count).toBe(0);

    act(() => {
      jest.runTimersToTime(500);
    });

    expect(result.current.count).toBe(1);
  });

  it('running', () => {
    const { result } = renderHook(() => useLoadingDots({}));

    act(() => {
      result.current.start();
      jest.runTimersToTime(500);
    });

    expect(result.current.count).toBe(1);
  });

  it('stop', () => {
    const { result } = renderHook(() => useLoadingDots({}));
    act(() => {
      result.current.start();
      jest.runTimersToTime(500);
    });

    act(() => {
      result.current.stop();
      jest.runTimersToTime(500);
    });

    expect(result.current.count).toBe(1);
  });

  it('stop with reset', () => {
    const { result } = renderHook(() => useLoadingDots({}));
    act(() => {
      result.current.start();
      jest.runTimersToTime(500);
    });

    act(() => {
      result.current.stop(true);
      jest.runTimersToTime(500);
    });

    expect(result.current.count).toBe(0);
  });

  it('reset', () => {
    const { result } = renderHook(() => useLoadingDots({}));
    act(() => {
      result.current.start();
      jest.runTimersToTime(500);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(0);

    act(() => {
      jest.runTimersToTime(500);
    });

    expect(result.current.count).toBe(1);
  });

  it('reset with stop', () => {
    const { result } = renderHook(() => useLoadingDots({}));
    act(() => {
      result.current.start();
      jest.runTimersToTime(500);
    });

    act(() => {
      result.current.reset(true);
    });

    expect(result.current.count).toBe(0);

    act(() => {
      jest.runTimersToTime(500);
    });

    expect(result.current.count).toBe(0);
  });
});
