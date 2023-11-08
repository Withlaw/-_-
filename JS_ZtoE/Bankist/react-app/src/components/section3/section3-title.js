import classes from "./section3-title.module.css";
function Section3Title() {
  return (
    <div className={`section__title ${classes.title}`}>
      <h2 className="section__description">Not sure yet?</h2>
      <h3 className="section__header">
        Millions of Bankists are already making their lifes simpler.
      </h3>
    </div>
  );
}

export default Section3Title;
