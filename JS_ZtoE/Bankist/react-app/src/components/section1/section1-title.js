import { useContext } from "react";
import { ScrollContext } from "../../context/scrollContext";

function Section1Title() {
  const { ref } = useContext(ScrollContext);
  return (
    <div className="section__title" ref={ref}>
      <h2 className="section__description">Features</h2>
      <h3 className="section__header">
        Everything you need in a modern bank and more.
      </h3>
    </div>
  );
}

export default Section1Title;
