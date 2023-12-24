import { TokenLocalRepositoryST } from "@/adapters/repository/token-repository";

const HomePage = () => {
  return null;
};

export default HomePage;

export const loader = () => {
  console.log("'root' route loader start");

  const tokenLocalRepository = new TokenLocalRepositoryST();
  const token = tokenLocalRepository.get();
  if (token) return token;

  console.log("'root' route loader done");
  return null;
};
