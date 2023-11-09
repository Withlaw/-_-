import { createContext, useContext, useEffect, useRef, useState } from "react";

const IntersectObsContext = createContext(null);
export const useIntersectObsContext = () => useContext(IntersectObsContext);

export default function IntersectObsContextProvider({ children }) {
  const [isIntersect, setIsIntersect] = useState(false);
  const obsRef = useRef([]); // nav, title

  useEffect(() => {
    const navHeight = obsRef.current[0].getBoundingClientRect().height;
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        // console.log(navHeight, entry, obsRef.current[1]);

        if (entry.isIntersecting) setIsIntersect(false);
        else setIsIntersect(true);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `-${navHeight}px`,
      }
    );
    observer.observe(obsRef.current[1]);
  }, []);
  return (
    <IntersectObsContext.Provider value={{ isIntersect, obsRef }}>
      {children}
    </IntersectObsContext.Provider>
  );
}
