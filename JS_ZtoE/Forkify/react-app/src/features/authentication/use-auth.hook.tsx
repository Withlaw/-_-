import { useNavigate, useRouteLoaderData } from "react-router-dom";

import { API_AUTH_BASE_URL, TOKEN_STATE } from "@/constants";
import { axiosInstance } from "@/adapters/api/axios";
import { HttpClientAxios } from "@/adapters/api/http-client";
import { TokenLocalRepositoryST } from "@/adapters/repository/token-repository";
import { AuthService } from "@/services/authService";
import { useEffect } from "react";

// auth tools package
const authHttpClient = new HttpClientAxios(axiosInstance, API_AUTH_BASE_URL);
const tokenLocalRepository = new TokenLocalRepositoryST();
const authService = new AuthService(authHttpClient, tokenLocalRepository);

export const useAuth = () => {
  const token = useRouteLoaderData("root");
  const navigate = useNavigate();
  const isLogin =
    token !== TOKEN_STATE.NOT_EXIST && token !== TOKEN_STATE.EXPIRED;

  console.log("useAuth: ", token, "isLogin: ", isLogin);

  // 로그인 버튼 핸들러
  const authButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { value } = e.currentTarget;
    if (value === "login") {
      // 이미 로그인 상태이면?
      const confirm = window.confirm("로그인하시겠습니까?");
      if (!confirm) return;
      return authService.login().then(() => {
        // navigate("/recipe");
        navigate("/recipe");
      });
      // 로그인 혹은 로그아웃 ajax 실패시 에러 핸들링 추가할것
    }
    if (value === "logout") {
      const confirm = window.confirm("로그아웃하시겠습니까?");
      if (!confirm) return;
      return authService.logout().then(() => {
        // navigate("/recipe");
        navigate("/recipe");
      });
    }
  };

  // 자동 로그아웃
  useEffect(() => {
    if (token === TOKEN_STATE.NOT_EXIST) return;
    if (token === TOKEN_STATE.EXPIRED)
      authService.logout().then(() => {
        navigate("/");
        return;
      });

    const tokenDuration = authService.tokenDuration;
    if (!tokenDuration) return;

    const logoutReservation = setTimeout(() => {
      authService.logout().then(() => {
        window.alert("로그인 시간이 만료되었습니다.");
        navigate("/recipe");
      });
    }, tokenDuration);

    return () => clearTimeout(logoutReservation);
  }, [token]);

  return { token, isLogin, authButtonHandler };
};
