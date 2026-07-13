import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Dispatch custom event for same-tab synchronization
      window.dispatchEvent(new CustomEvent('local-storage', {
        detail: { key, newValue: valueToStore }
      }));
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.key === key) {
        setStoredValue(customEvent.detail.newValue);
      }
    };

    const handleWindowStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('local-storage', handleStorageChange);
    window.addEventListener('storage', handleWindowStorage);

    return () => {
      window.removeEventListener('local-storage', handleStorageChange);
      window.removeEventListener('storage', handleWindowStorage);
    };
  }, [key]);

  return [storedValue, setValue];
}
