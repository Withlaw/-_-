import { useEffect, useState } from "react";
import classes from "./section3-slider.module.css";
import user1 from "../../assets/img/user-1.jpg";
import user2 from "../../assets/img/user-2.jpg";
import user3 from "../../assets/img/user-3.jpg";

function Section3Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleBtnR = e => {
    if (currentSlide < 2) setCurrentSlide(prev => ++prev);
    else setCurrentSlide(0);
  };
  const handleBtnL = e => {
    if (currentSlide > 0) setCurrentSlide(prev => --prev);
    else setCurrentSlide(2);
  };
  const handleBtnDots = (e, i) => {
    setCurrentSlide(i);
  };
  const handleKeydown = e => {
    e.key === "ArrowLeft" && handleBtnL();
    e.key === "ArrowRight" && handleBtnR();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [currentSlide]);
  return (
    <div className={classes.slider}>
      {slideContent.map((el, idx) => (
        <div
          className={classes.slide}
          style={{ transform: `translateX(${(idx - currentSlide) * 100}%)` }}
        >
          <div className={classes.testimonial}>
            <h5 className={classes.header}>{el.header}</h5>
            <blockquote className={classes.text}>{el.text}</blockquote>
            <address className={classes.author}>
              <img src={el.imgSrc} alt="" className={classes.photo} />
              <h6 className={classes.name}>{el.name}</h6>
              <p className={classes.location}>{el.location}</p>
            </address>
          </div>
        </div>
      ))}

      <button
        className={`${classes.btn} ${classes["btn-left"]}`}
        onClick={handleBtnL}
      >
        &larr;
      </button>
      <button
        className={`${classes.btn} ${classes["btn-right"]}`}
        onClick={handleBtnR}
      >
        &rarr;
      </button>
      <div className={classes.dots}>
        {slideContent.map((_, idx) => (
          <button
            className={`${classes.dot} ${
              currentSlide === idx ? classes["dot-active"] : ""
            }`}
            onClick={e => {
              handleBtnDots(e, idx);
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}
const slideContent = [
  {
    header: "Best financial decision ever!",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quas quisquam non? Quas voluptate nulla minima delenitioptio ullam nesciunt, numquam corporis et asperiores laboriosamsunt, praesentium suscipit blanditiis. Necessitatibus id alias reiciendis, perferendis facere pariatur dolore veniam autem esse nonvoluptatem saepe provident nihil molestiae.",
    imgSrc: user1,
    name: "Aarav Lynn",
    location: "San Francisco, USA",
  },
  {
    header: "The last step to becoming a complete minimalist",
    text: "Quisquam itaque deserunt ullam, quia ea repellendus provident, ducimus neque ipsam modi voluptatibus doloremque, corrupti laborum. Incidunt numquam perferendis veritatis neque repellendus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo deserunt exercitationem deleniti.",
    imgSrc: user2,
    name: "Miyah Miles",
    location: "London, UK",
  },
  {
    header: "Finally free from old-school banks",
    text: "Debitis, nihil sit minus suscipit magni aperiam vel tenetur incidunt commodi architecto numquam omnis nulla autem, necessitatibus blanditiis modi similique quidem. Odio aliquam culpa dicta beatae quod maiores ipsa minus consequatur error sunt, deleniti saepe aliquid quos inventore sequi. Necessitatibus id alias reiciendis, perferendis facere.",
    imgSrc: user3,
    name: "Francisco Gomes",
    location: "Lisbon, Portugal",
  },
];

export default Section3Slider;
