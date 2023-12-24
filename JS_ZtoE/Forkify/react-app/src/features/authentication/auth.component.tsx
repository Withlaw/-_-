import AuthButton from "@/features/authentication/auth-button.component";
import { useAuth } from "@/features/authentication/use-auth.hook";

const Auth = () => {
  const { isLogin, authButtonHandler } = useAuth();

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
