import { useEffect, useState } from 'react';

/**
 * Devolve o valor só depois que ele fica `delay` ms sem mudar.
 *
 * @example
 * ```tsx
 * const debouncedAmount = useDebouncedValue(amount, INPUT_DEBOUNCE_MS);
 * ```
 */
export function useDebouncedValue<Value>(value: Value, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
