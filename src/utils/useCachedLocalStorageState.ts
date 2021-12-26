import { useEffect, useState, Dispatch, SetStateAction } from "react";

/**
 * Cached/persistant state across component mounts 
 * State saved in a localStorage
 * API the same as useState but state is saved between component mounts
 * Use case: jump between views when routing and we want to keep some state the same 
 * when turning back to the view. 
 * Use with caution! This approach is introducing external dependancy on localStorage.
 * Lifting state up the hierarchy often is a better option.
 * 
 * Long hook name is on purpose as a reminder of using it sparingly
 * 
 * @param key LocalStorage key under which state is saved and retrieved
 * @returns 
 */
export default function useCachedLocalStorageState<T>(key: string): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [state, setState] = useState<T>();

  // retrieve state from a localStorage on instantiation
  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value) 
      setState(JSON.parse(value));
  }, []);

  // update localStorage value on each state change
  useEffect(() => {
    if (state) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  return [state, setState];
}