/**
 * Hook customizado para gerenciar contador com validação
 * 
 * @module components/social/hooks/use-counter
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import { useState, useCallback } from 'react';

/**
 * Opções para o hook {@link useCounter}.
 * Permitem configurar valor inicial, limites, passo e callback de mudança.
 */
export interface CounterOptions {
  /** Valor inicial do contador (padrão: 0). */
  initialValue?: number;
  /** Valor mínimo permitido (padrão: 0). */
  min?: number;
  /** Valor máximo permitido (padrão: Infinity). */
  max?: number;
  /** Passo de incremento/decremento (padrão: 1). */
  step?: number;
  /** Callback disparada após mudança, recebendo valor atual e delta. */
  onChange?: (value: number, delta: number) => void;
}

/**
 * Hook para gerenciar contador com limites, passo customizado e callback de mudança.
 * Inclui helpers para incremento, decremento, set e reset, além de flags úteis.
 */
export function useCounter({
  initialValue = 0,
  min = 0,
  max = Infinity,
  step = 1,
  onChange
}: CounterOptions = {}) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => {
      const newValue = Math.min(prev + step, max);
      if (newValue !== prev) {
        onChange?.(newValue, step);
      }
      return newValue;
    });
  }, [step, max, onChange]);

  const decrement = useCallback(() => {
    setCount(prev => {
      const newValue = Math.max(prev - step, min);
      if (newValue !== prev) {
        onChange?.(newValue, -step);
      }
      return newValue;
    });
  }, [step, min, onChange]);

  const set = useCallback((value: number) => {
    const clampedValue = Math.max(min, Math.min(max, value));
    setCount(clampedValue);
    if (clampedValue !== count) {
      onChange?.(clampedValue, clampedValue - count);
    }
  }, [min, max, count, onChange]);

  const reset = useCallback(() => {
    setCount(initialValue);
    if (initialValue !== count) {
      onChange?.(initialValue, initialValue - count);
    }
  }, [initialValue, count, onChange]);

  return {
    count,
    increment,
    decrement,
    set,
    reset,
    canIncrement: count < max,
    canDecrement: count > min,
    isAtMin: count === min,
    isAtMax: count === max
  };
}
