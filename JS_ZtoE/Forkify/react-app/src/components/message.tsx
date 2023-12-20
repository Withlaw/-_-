import icons from "@/assets/icons/icons.svg";

const Message = ({ message = "메세지를 입력하세요" }: { message: string }) => {
  return (
    <div className="message">
      <div>
        <svg>
          <use href={`${icons}#icon-smile`}></use>
        </svg>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Message;
