import { useState, useEffect } from "react";

function useDebounce(value: string | number, delay:number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set the value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes or component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
