import classes from "./modal-window.module.css";

function ModalWindow({ handleClickModal }) {
  const handleKeyUp = e => {
    console.log("gg");
  };
  return (
    <div className={classes.modal} onKeyUp={handleKeyUp}>
      <button className={classes.closeBtn} onClick={handleClickModal}>
        &times;
      </button>
      <h2 className={classes.header}>
        Open your bank account <br />
        in just <span className={classes.highlight}>5 minutes</span>
      </h2>
      <form className={classes.form}>
        <label>First Name</label>
        <input type="text" />
        <label>Last Name</label>
        <input type="text" />
        <label>Email Address</label>
        <input type="email" />
        <button className={classes.btn}>Next step &rarr;</button>
      </form>
    </div>
  );
}

export default ModalWindow;
