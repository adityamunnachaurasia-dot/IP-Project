import { useState, useEffect } from "react";

/*
 * A small custom hook that keeps a piece of state in sync
 * with localStorage. It reads the initial value once, then
 * writes back whenever the state changes.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* localStorage may be unavailable in some browsers */
    }
  }, [key, value]);

  return [value, setValue];
}