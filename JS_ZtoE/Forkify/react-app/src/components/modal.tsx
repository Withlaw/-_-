import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  children: React.ReactNode;
  className?: string;
  onClose?(): void;
};

const modalRoot = document.getElementById("modal") as HTMLElement;

const Modal = ({ className, children, onClose }: ModalProps) => {
  // const dialog = useRef<HTMLDialogElement | null>(null);
  // useEffect(() => {
  //   const modal = dialog.current;
  //   modal?.showModal();
  //   return modal?.close();
  // }, []);

  return createPortal(
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className={className}>{children}</div>
    </>,
    modalRoot
  );
};

export default Modal;
