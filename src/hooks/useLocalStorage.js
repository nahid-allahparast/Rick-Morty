import { useEffect, useState } from "react";

export default function useLocalStorage(key, initaialState) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initaialState
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}
