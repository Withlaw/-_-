import Fetchy from "@/adapters/api/interface";
import Storagy, { TokenStoragy } from "@/adapters/repository/interface";
/*
interface AuthServiceInterface {
signin(email, password):void
signup(email, password):void
logout():void
}
*/

export class AuthService {
  constructor(
    private httpClient: Fetchy,
    private tokenRepository: TokenStoragy
  ) {}

  login() {
    // fb를 이용할때,
    // 토큰 만료기간을 보내면, 자동으로 id 생성하고 반환해줄거임
    // 그걸 토큰으로 사용
  }
  logout() {}
}
