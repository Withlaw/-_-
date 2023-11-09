import { createContext, useContext, useEffect, useRef, useState } from "react";
import useObserve from "../hooks/useObserve";

const IntersectObsContext = createContext(null);
export const useIntersectObsContext = () => useContext(IntersectObsContext);

export default function IntersectObsContextProvider({ children }) {
  const [isIntersect, setIsIntersect] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef();

  useEffect(() => {
    setNavHeight(navRef.current.getBoundingClientRect().height);
  }, []);

  const { observerTarget: headerTitleRed } = useObserve(
    entry => {
      if (entry.isIntersecting) setIsIntersect(false);
      else setIsIntersect(true);
    },
    {
      root: null,
      threshold: 0,
      rootMargin: `-${navHeight}px`,
    }
  );

  // useEffect(() => {
  //   const navHeight = obsRef.current[0].getBoundingClientRect().height;
  //   const observer = new IntersectionObserver(
  //     entries => {
  //       const [entry] = entries;
  //       // console.log(navHeight, entry, obsRef.current[1]);
  //       // console.log("cl: ,", entry);
  //       if (entry.isIntersecting) setIsIntersect(false);
  //       else setIsIntersect(true);
  //     },
  //     {
  //       root: null,
  //       threshold: 0,
  //       rootMargin: `-${navHeight}px`,
  //     }
  //   );
  //   observer.observe(obsRef.current[1]);
  // }, []);
  return (
    <IntersectObsContext.Provider
      value={{ isIntersect, headerTitleRed, navRef }}
    >
      {children}
    </IntersectObsContext.Provider>
  );
}
