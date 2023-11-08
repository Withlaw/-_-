import Section2Operations from "./components/section2/section2-operations";
import Section2Title from "./components/section2/section2-title";
import { useContext } from "react";
import { ScrollContext } from "./context/scrollContext";

function Section2() {
  const { navRef } = useContext(ScrollContext);
  return (
    <section
      className="section"
      id="section--2"
      ref={el => (navRef.current[1] = el)}
    >
      <Section2Title />
      <Section2Operations />
    </section>
  );
}

export default Section2;
