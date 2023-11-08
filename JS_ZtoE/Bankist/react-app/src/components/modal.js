import { createPortal } from "react-dom";
import Overlay from "./modal/modal-overlay";
import ModalWindow from "./modal/modal-window";
import { useEffect } from "react";

function Modal({ handleClickModal }) {
  useEffect(() => {
    const handleKeyUp = e => {
      if (e.key !== "Escape") return;
      handleClickModal(e);
    };
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, []);
  return (
    <>
      {createPortal(
        <ModalWindow handleClickModal={handleClickModal} />,
        document.getElementById("root")
      )}
      {createPortal(
        <Overlay handleClickModal={handleClickModal} />,
        document.getElementById("root")
      )}
    </>
  );
}

export default Modal;
