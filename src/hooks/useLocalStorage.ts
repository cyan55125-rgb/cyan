import { useState, useCallback } from 'react';

interface LocalStorageHook<T> {
  value: T | null;
  setValue: (key: string, value: T) => void;
  getValue: <U>(key: string, defaultValue: U) => T | U;
  removeKey: (key: string) => void;
}

export function useLocalStorage<T>(): LocalStorageHook<T> {
  const [value, setValueState] = useState<T | null>(null);

  const setValue = useCallback((key: string, val: T) => {
    try {
      const serialized = JSON.stringify(val);
      localStorage.setItem(key, serialized);
      setValueState(val);
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, []);

  const getValue = useCallback(<U>(key: string, defaultValue: U): T | U => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      const parsed = JSON.parse(item) as T;
      setValueState(parsed);
      return parsed;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  }, []) as LocalStorageHook<T>['getValue'];

  const removeKey = useCallback((key: string) => {
    try {
      localStorage.removeItem(key);
      setValueState(null);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, []);

  return { value, setValue, getValue, removeKey };
}
