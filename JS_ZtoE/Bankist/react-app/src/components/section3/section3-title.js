import classes from "./section3-title.module.css";
function Section3Title() {
  return (
    <div class={`section__title ${classes.title}`}>
      <h2 class="section__description">Not sure yet?</h2>
      <h3 class="section__header">
        Millions of Bankists are already making their lifes simpler.
      </h3>
    </div>
  );
}

export default Section3Title;
