import { useState } from "react";
import Modal from "./components/modal/modal";
import useObserve from "./hooks/useObserve";

function Section4() {
  const [isModal, setIsModal] = useState(false);
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
  const handleClickModal = e => {
    e.preventDefault();
    setIsModal(prev => !prev);
  };
  return (
    <section
      className={`section section--sign-up ${
        isReveal ? "" : "section--hidden"
      }`}
      ref={observerTarget}
    >
      <div className="section__title">
        <h3 className="section__header">
          The best day to join Bankist was one year ago. The second best is
          today!
        </h3>
      </div>
      <button onClick={handleClickModal} className="btn btn--show-modal">
        Open your free account today!
      </button>
      {isModal && <Modal handleClickModal={handleClickModal} />}
    </section>
  );
}

export default Section4;
