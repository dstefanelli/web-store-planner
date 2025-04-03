import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useTimedAlert } from '../useTimedAlert';
import { vi } from 'vitest';

vi.useFakeTimers();

describe('useTimedAlert', () => {
  it('sets alert and auto-hides after 3 seconds', () => {
    const { result } = renderHook(() => useTimedAlert());

    // Mostrar alerta
    act(() => {
      result.current.setAlert({
        show: true,
        message: 'Test alert',
        type: 'success',
      });
    });

    // Se muestra correctamente
    expect(result.current.alert.show).toBe(true);
    expect(result.current.alert.message).toBe('Test alert');

    // Avanza el tiempo
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // La alerta se oculta automáticamente
    expect(result.current.alert.show).toBe(false);
  });
});
