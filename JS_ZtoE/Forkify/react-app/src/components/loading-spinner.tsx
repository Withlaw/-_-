import icons from "@/assets/icons/icons.svg";

const LoadingSpinner = () => {
  return (
    <div className="spinner">
      <svg>
        <use href={`${icons}#icon-loader`}></use>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
