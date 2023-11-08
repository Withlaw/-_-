import { useState } from "react";
import Modal from "./modal";
import classes from "./open-account.module.css";

function OpenAccount({ isHovered, isTarget, handleMouseoverToggle }) {
  const [isModal, setIsModal] = useState(false);
  const handleClickModal = e => {
    e.preventDefault();
    setIsModal(prev => !prev);
  };
  return (
    <>
      <li
        className={`${classes.item} ${
          isHovered && !isTarget ? classes.hover : ""
        }`}
        onMouseOver={handleMouseoverToggle}
        onMouseOut={handleMouseoverToggle}
        onClick={handleClickModal}
      >
        <a className={`${classes.link} ${classes.button}`} href="">
          Open account
        </a>
      </li>
      {isModal && <Modal handleClickModal={handleClickModal} />}
    </>
  );
}

export default OpenAccount;
