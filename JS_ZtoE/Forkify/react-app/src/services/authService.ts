import Fetchy from "@/adapters/api/interface";
import Storagy, {
  TokenStoragy,
  TokenStoragyTest,
} from "@/adapters/repository/interface";
import { TokenLocalRepositoryST } from "@/adapters/repository/token-repository";
import { TOKEN_STATE } from "@/constants";
/*
interface AuthServiceInterface {
signin(email, password):void
signup(email, password):void
logout():void
}
*/

interface AuthResData {
  name: string;
}

export class AuthService {
  constructor(
    private httpClient: Fetchy,
    private tokenRepository: TokenLocalRepositoryST
  ) {}

  async login() {
    // fb를 이용할때,
    // 토큰 만료기간을 보내면, 자동으로 id 생성하고 반환해줄거임
    // 그걸 토큰으로 사용
    try {
      const expiration = this.tokenRepository.getExpiration({
        unit: "min",
        limit: 1,
      });

      const res = await this.httpClient.post<AuthResData>(
        "/auth.json",
        expiration
      );

      // 여러 오류 처리

      const { name } = res;

      this.tokenRepository.set(name, expiration);
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const token = this.tokenRepository.get();

      if (token === TOKEN_STATE.NOT_EXIST) return;

      const res = await this.httpClient.delete(`/auth/${token}.json`);

      // if (!res.ok) throw "auth logout error!";
      this.tokenRepository.remove();
    } catch (error) {
      throw error;
    }
  }

  get tokenDuration() {
    return this.tokenRepository.duration;
  }
}
