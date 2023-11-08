import { createContext, useContext, useRef } from "react";

export const ScrollContext = createContext(null);
export const useScrollContext = () => {
  const value = useContext(ScrollContext);
  if (value === null) throw new Error("useScrollContext 프로바이더 오류");
  return value;
};

function ScrollContextProvider({ children }) {
  const ref = useRef(null);
  const navRef = useRef([]);
  const handleScrolling = to => {
    to.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <ScrollContext.Provider value={{ ref, navRef, handleScrolling }}>
      {children}
    </ScrollContext.Provider>
  );
}

export default ScrollContextProvider;
