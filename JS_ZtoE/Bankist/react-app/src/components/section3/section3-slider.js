import classes from "./section3-slider.module.css";
function Section3Slider() {
  return (
    <div className={classes.slider}>
      <div className={classes.slide}>
        <div className={classes.testimonial}>
          <h5 className={classes.header}>Best financial decision ever!</h5>
          <blockquote className={classes.text}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Accusantium quas quisquam non? Quas voluptate nulla minima deleniti
            optio ullam nesciunt, numquam corporis et asperiores laboriosam
            sunt, praesentium suscipit blanditiis. Necessitatibus id alias
            reiciendis, perferendis facere pariatur dolore veniam autem esse non
            voluptatem saepe provident nihil molestiae.
          </blockquote>
          <address className={classes.author}>
            <img src="img/user-1.jpg" alt="" className={classes.photo} />
            <h6 className={classes.name}>Aarav Lynn</h6>
            <p className={classes.location}>San Francisco, USA</p>
          </address>
        </div>
      </div>

      <div className={classes.slide}>
        <div className={classes.testimonial}>
          <h5 className={classes.header}>
            The last step to becoming a complete minimalist
          </h5>
          <blockquote className={classes.text}>
            Quisquam itaque deserunt ullam, quia ea repellendus provident,
            ducimus neque ipsam modi voluptatibus doloremque, corrupti laborum.
            Incidunt numquam perferendis veritatis neque repellendus. Lorem,
            ipsum dolor sit amet consectetur adipisicing elit. Illo deserunt
            exercitationem deleniti.
          </blockquote>
          <address className={classes.author}>
            <img src="img/user-2.jpg" alt="" className={classes.photo} />
            <h6 className={classes.name}>Miyah Miles</h6>
            <p className={classes.location}>London, UK</p>
          </address>
        </div>
      </div>

      <div className={classes.slide}>
        <div className={classes.testimonial}>
          <h5 className={classes.header}>Finally free from old-school banks</h5>
          <blockquote className={classes.text}>
            Debitis, nihil sit minus suscipit magni aperiam vel tenetur incidunt
            commodi architecto numquam omnis nulla autem, necessitatibus
            blanditiis modi similique quidem. Odio aliquam culpa dicta beatae
            quod maiores ipsa minus consequatur error sunt, deleniti saepe
            aliquid quos inventore sequi. Necessitatibus id alias reiciendis,
            perferendis facere.
          </blockquote>
          <address className={classes.author}>
            <img src="img/user-3.jpg" alt="" className={classes.photo} />
            <h6 className={classes.name}>Francisco Gomes</h6>
            <p className={classes.location}>Lisbon, Portugal</p>
          </address>
        </div>
      </div>

      <button className={`${classes.btn} ${classes["btn-left"]}`}>
        &larr;
      </button>
      <button className={`${classes.btn} ${classes["btn-right"]}`}>
        &rarr;
      </button>
      <div className={classes.dots}></div>
    </div>
  );
}

export default Section3Slider;
