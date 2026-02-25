'use strict';

var react = require('react');

// src/hooks/use-counter.ts
function useCounter({
  initialValue = 0,
  min = 0,
  max = Infinity,
  step = 1,
  onChange
} = {}) {
  const [count, setCount] = react.useState(initialValue);
  const increment = react.useCallback(() => {
    setCount((prev) => {
      const newValue = Math.min(prev + step, max);
      if (newValue !== prev) {
        onChange?.(newValue, step);
      }
      return newValue;
    });
  }, [step, max, onChange]);
  const decrement = react.useCallback(() => {
    setCount((prev) => {
      const newValue = Math.max(prev - step, min);
      if (newValue !== prev) {
        onChange?.(newValue, -step);
      }
      return newValue;
    });
  }, [step, min, onChange]);
  const set = react.useCallback((value) => {
    const clampedValue = Math.max(min, Math.min(max, value));
    setCount(clampedValue);
    if (clampedValue !== count) {
      onChange?.(clampedValue, clampedValue - count);
    }
  }, [min, max, count, onChange]);
  const reset = react.useCallback(() => {
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

exports.useCounter = useCounter;
//# sourceMappingURL=use-counter.js.map
//# sourceMappingURL=use-counter.js.map