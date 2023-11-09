import { useContext, useState } from "react";
import Section3Slider from "./components/section3/section3-slider";
import Section3Title from "./components/section3/section3-title";
import { ScrollContext } from "./context/scrollContext";
import useObserve from "./hooks/useObserve";

function Section3() {
  const { navRef } = useContext(ScrollContext);
  const [isReveal, setIsReveal] = useState(false);
  const { observerTarget } = useObserve(
    (entry, observer) => {
      if (!entry.isIntersecting) return;
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
      id="section--3"
      ref={el => {
        navRef.current[2] = el;
        observerTarget.current = el;
      }}
    >
      <Section3Title />
      <Section3Slider />
    </section>
  );
}

export default Section3;
