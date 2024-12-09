import { useState } from 'react';

/**
 * Custom hook to manage local storage.
 *
 * @param {string} key - The key under which the value is stored in local storage.
 * @param {*} initialValue - The initial value to be stored.
 * @returns {[*, function]} - Returns the stored value and a function to update it.
 */
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  /**
   * Sets the value in local storage and updates the state.
   * @param {any} value - The value to be stored.
   */
  const setValue = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;


