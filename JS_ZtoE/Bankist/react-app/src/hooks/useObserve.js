import { useCallback, useEffect, useRef } from "react";

export default function useObserve(callback, options) {
  const observerTarget = useRef(null);

  const obsCallback = useCallback(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        callback();
      });
    },
    [callback]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(obsCallback, options);
    observer.observe(observerTarget.current);
    return () => {
      observer.disconnect();
    };
  }, [obsCallback, options]);

  return { observerTarget };
}
