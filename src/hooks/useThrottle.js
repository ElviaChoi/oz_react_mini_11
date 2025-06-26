import { useRef } from "react";

export default function useThrottle(callback, delay) {
  const throttleRef = useRef(null);

  return (...args) => {
    if (!throttleRef.current) {
      throttleRef.current = setTimeout(() => {
        callback(...args);
        throttleRef.current = null;
      }, delay);
    }
  };
}
