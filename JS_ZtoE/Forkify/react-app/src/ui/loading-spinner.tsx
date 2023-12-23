import icons from "@/assets/icons/icons.svg";

const LoadingSpinner = () => {
  // console.log("LoadingSpinner render");
  return (
    <div className="spinner">
      <svg>
        <use href={`${icons}#icon-loader`}></use>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
