import Storagy, {
  TokenStoragy,
  TokenStoragyTest,
} from "@/adapters/repository/interface";

export default class TokenRepository implements TokenStoragy {
  constructor(
    private key: string,
    private storage: Storagy,
    private limit: number = 1
  ) {}

  save(value: string) {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + this.limit);

    this.storage.setItem(this.key, value);
    this.storage.setItem("expiration", expiration.toISOString());
  }

  get() {
    if (!this.duration) return null;
    // 토큰이 없거나, 기한이 만료되었으면 null 반환

    const token = this.storage.getItem(this.key);
    return token;
  }

  remove() {
    this.storage.removeItem(this.key);
    this.storage.removeItem("expiration");
  }

  private get duration() {
    const now = new Date();
    const expirationDate = this.storage.getItem("expiration");
    if (!expirationDate) return null; // 토큰이 없음

    const date = new Date(expirationDate);
    const duration = date.getTime() - now.getTime();

    if (duration <= 0) return null; // 기한이 만료됨

    return duration;
  }
}

export class TokenRepositoryTest implements TokenStoragyTest {
  constructor(private key: string, private storage: Storagy) {}

  save(value: string, expiration: string) {
    this.storage.setItem(this.key, value);
    this.storage.setItem("expiration", expiration);
  }

  get() {
    if (!this.duration) return null;
    // 토큰이 없거나, 기한이 만료되었으면 null 반환

    const token = this.storage.getItem(this.key);
    return token;
  }

  remove() {
    this.storage.removeItem(this.key);
    this.storage.removeItem("expiration");
  }

  private get duration() {
    const now = new Date();
    const expirationDate = this.storage.getItem("expiration");
    if (!expirationDate) return null; // 토큰이 없음

    const date = new Date(expirationDate);
    const duration = date.getTime() - now.getTime();

    if (duration <= 0) return null; // 기한이 만료됨

    return duration;
  }
}
