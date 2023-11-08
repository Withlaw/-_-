import classes from "./modal-overlay.module.css";

function Overlay({ handleClickModal }) {
  return <div className={classes.overlay} onClick={handleClickModal}></div>;
}

export default Overlay;
