import { useNavigate, useRouteLoaderData } from "react-router-dom";

import { API_AUTH_BASE_URL } from "@/constants";
import { axiosInstance } from "@/adapters/api/axios";
import { HttpClientAxios } from "@/adapters/api/http-client";
import { TokenLocalRepositoryST } from "@/adapters/repository/token-repository";
import { AuthService } from "@/services/authService";
import { useEffect } from "react";

// auth
const authHttpClient = new HttpClientAxios(axiosInstance, API_AUTH_BASE_URL);
const tokenLocalRepository = new TokenLocalRepositoryST();
const authService = new AuthService(authHttpClient, tokenLocalRepository);

export const useAuth = () => {
  const token = useRouteLoaderData("root");
  const isLogin = token != null;
  console.log("teonken: ", token, isLogin);

  const navigate = useNavigate();

  const authButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { value } = e.currentTarget;
    if (value === "login") {
      const confirm = window.confirm("로그인하시겠습니까?");
      if (!confirm) return;
      navigate("/");
      return authService.login();
    }
    if (value === "logout") {
      const confirm = window.confirm("로그아웃하시겠습니까?");
      if (!confirm) return;
      navigate("/");
      return authService.logout();
    }
  };

  // 자동 로그아웃 처리
  useEffect(() => {
    if (isLogin) return;

    const duration = authService.tokenDuration;
    if (!duration) {
      authService.logout();
      return;
    }

    const autoLogout = setTimeout(() => {
      window.alert("로그인 시간이 만료되었습니다.");
      authService.logout();
    }, duration);

    return () => clearTimeout(autoLogout);
  }, [token]);

  return { token, isLogin, authButtonHandler };
};
