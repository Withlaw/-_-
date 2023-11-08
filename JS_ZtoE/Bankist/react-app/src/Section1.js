import Section1Features from "./components/section1/section1-features";
import Section1Title from "./components/section1/section1-title";
import { useContext } from "react";
import { ScrollContext } from "./context/scrollContext";

function Section1() {
  const { navRef } = useContext(ScrollContext);
  return (
    <section className="section" ref={el => (navRef.current[0] = el)}>
      <Section1Title />
      <Section1Features />
    </section>
  );
}

export default Section1;
