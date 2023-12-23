import React from "react";
import icons from "@/assets/icons/icons.svg";

type AuthButtonProps = {
  type: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const AuthButton = ({ type, onClick }: AuthButtonProps) => {
  return (
    <button className="btn--small recipe__btn" value={type} onClick={onClick}>
      <svg className="recipe__info-icon">
        <use href={`${icons}#icon-user`}></use>
      </svg>
      {/* <span>{type[0].toUpperCase() + type.slice(1)}</span> */}
      <span>{type}</span>
    </button>
  );
};

export default AuthButton;
