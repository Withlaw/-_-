import { createPortal } from "react-dom";
import Overlay from "./modal-overlay";
import ModalWindow from "./modal-window";

function Modal() {
  return (
    <>
      {createPortal(<ModalWindow />, document.getElementById("root"))}
      {createPortal(<Overlay />, document.getElementById("root"))}
    </>
  );
}

export default Modal;
