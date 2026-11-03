import { useState, useCallback, useRef } from "react";

/*
 * Provides a simple toast notification system.
 * Usage: const { toast, showToast } = useToast();
 */
export default function useToast() {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  return { toast, showToast };
}