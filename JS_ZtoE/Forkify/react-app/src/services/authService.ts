import Fetchy from "@/adapters/api/interface";
import Storagy, {
  TokenStoragy,
  TokenStoragyTest,
} from "@/adapters/repository/interface";
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
  private readonly limit = 1;

  constructor(
    private httpClient: Fetchy,
    private tokenRepository: TokenStoragyTest
  ) {}

  async login() {
    // fb를 이용할때,
    // 토큰 만료기간을 보내면, 자동으로 id 생성하고 반환해줄거임
    // 그걸 토큰으로 사용
    try {
      const res = await this.httpClient.post<AuthResData>(
        "/auth.json",
        this.expiration
      );
      const { name } = res;

      this.tokenRepository.save(name, this.expiration);
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      const token = this.tokenRepository.get();
      if (!token) return;

      const res = await this.httpClient.delete(`/auth/${token}.json`);

      // if (!res.ok) throw "auth logout error!";

      this.tokenRepository.remove();
    } catch (error) {
      throw error;
    }
  }

  private get expiration() {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + this.limit);

    return expirationDate.toISOString();
  }
}
