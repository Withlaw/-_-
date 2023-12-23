import { Link } from "react-router-dom";

const PaperPage = () => {
  return (
    <Link to={".."} relative="path">
      뒤로가기
    </Link>
  );
};

export default PaperPage;
