import Section1Features from "./components/section1/section1-features";
import Section1Title from "./components/section1/section1-title";
import { useContext, useState } from "react";
import { ScrollContext } from "./context/scrollContext";
import useObserve from "./hooks/useObserve";

function Section1() {
  const [isReveal, setIsReveal] = useState(false);
  const { navRef } = useContext(ScrollContext);
  const { observerTarget } = useObserve(
    (entry, observer) => {
      if (!entry.isIntersecting) return;
      setIsReveal(true);
      observer.unobserve(entry.target);
    },
    {
      root: null,
      threshold: 0.15,
    }
  );

  return (
    <section
      className={`section ${isReveal ? "" : "section--hidden"}`}
      ref={el => {
        navRef.current[0] = el;
        observerTarget.current = el;
      }}
    >
      <Section1Title />
      <Section1Features />
    </section>
  );
}

export default Section1;
