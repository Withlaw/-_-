import icons from "@/assets/icons/icons.svg";
import { useAuthReq } from "@/hooks/useAuthReq";
const AuthButton = ({ type }: { type: string }) => {
  useAuthReq();
  return (
    <button className="btn--small recipe__btn" value={type}>
      <svg className="recipe__info-icon">
        <use href={`${icons}#icon-user`}></use>
      </svg>
      {/* <span>{type[0].toUpperCase() + type.slice(1)}</span> */}
      <span>{type}</span>
    </button>
  );
};

export default AuthButton;
