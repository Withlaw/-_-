import Section2Operations from "./components/section2/section2-operations";
import Section2Title from "./components/section2/section2-title";
import { useContext, useState } from "react";
import { ScrollContext } from "./context/scrollContext";
import useObserve from "./hooks/useObserve";

function Section2() {
  const [isReveal, setIsReveal] = useState(false);
  const { navRef } = useContext(ScrollContext);
  const { observerTarget } = useObserve(
    (entry, observer) => {
      // console.log("entry target: ", entry.target, entry);
      setIsReveal(true);
      observer.unobserve(entry.target);
    },
    {
      root: null,
      threshold: 0.2,
    }
  );
  return (
    <section
      className={`section ${isReveal ? "" : "section--hidden"}`}
      id="section--2"
      ref={el => {
        navRef.current[1] = el;
        observerTarget.current = el;
      }}
    >
      <Section2Title />
      <Section2Operations />
    </section>
  );
}

export default Section2;
