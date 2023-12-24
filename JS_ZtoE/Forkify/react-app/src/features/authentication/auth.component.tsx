import AuthButton from "@/features/authentication/auth-button.component";
import { useAuth } from "@/features/authentication/use-auth.hook";

const Auth = () => {
  const { isLogin, authButtonHandler } = useAuth();
  console.log("auth component 리렌더", isLogin);

  return (
    <>
      {isLogin ? (
        <AuthButton type="logout" onClick={authButtonHandler} />
      ) : (
        <AuthButton type="login" onClick={authButtonHandler} />
      )}
    </>
  );
};

export default Auth;
