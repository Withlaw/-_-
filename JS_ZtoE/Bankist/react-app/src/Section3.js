import { useContext } from "react";
import Section3Slider from "./components/section3/section3-slider";
import Section3Title from "./components/section3/section3-title";
import { ScrollContext } from "./context/scrollContext";

function Section3() {
  const { navRef } = useContext(ScrollContext);
  return (
    <section
      className="section"
      id="section--3"
      ref={el => (navRef.current[2] = el)}
    >
      <Section3Title />
      <Section3Slider />
    </section>
  );
}

export default Section3;
