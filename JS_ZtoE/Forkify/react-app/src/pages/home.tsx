import { TokenLocalRepositoryST } from "@/adapters/repository/token-repository";

const HomePage = () => {
  return null;
};

export default HomePage;

export const loader = () => {
  console.log("'root' route loader run");

  const tokenLocalRepository = new TokenLocalRepositoryST();
  const token = tokenLocalRepository.get();
  return token;
};
