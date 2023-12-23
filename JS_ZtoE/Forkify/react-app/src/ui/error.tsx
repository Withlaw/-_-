import icons from "@/assets/icons/icons.svg";

const Error = ({ message = "error ouccured" }: { message: string }) => {
  return (
    <div className="error">
      <div>
        <svg>
          <use href={`${icons}#icon-alert-triangle`}></use>
        </svg>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Error;
