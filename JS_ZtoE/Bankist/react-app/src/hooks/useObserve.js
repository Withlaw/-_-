import { useCallback, useEffect, useRef } from "react";

export default function useObserve(callback, options, initialRef = null) {
  const observerTarget = useRef(initialRef);

  const obsCallback = useCallback(
    (entries, observer) => {
      entries.forEach(entry => {
        // if (!entry.isIntersecting) return;
        callback(entry, observer);
      });
    },
    [callback]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(obsCallback, options);
    if (Array.isArray(observerTarget.current))
      observerTarget.current.forEach(el => observer.observe(el));
    else observer.observe(observerTarget.current);
    return () => {
      observer.disconnect();
    };
  }, [obsCallback, options]);

  return { observerTarget };
}
