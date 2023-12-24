import Storagy, {
  TokenStoragy,
  TokenStoragyTest,
} from "@/adapters/repository/interface";
import { TOKEN_STATE } from "@/constants";

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

// export class TokenRepositoryTest implements TokenStoragyTest {
//   // key: string;
//   // storage: Storagy;

//   constructor(protected key: string, protected storage: Storagy) {
//     // this.key = key;
//     // this.storage = storage;
//   }

//   save(value: string, expiration: string) {
//     this.storage.setItem(this.key, value);
//     this.storage.setItem("expiration", expiration);
//   }

//   get() {
//     if (!this.duration) return null;
//     // 토큰이 없거나, 기한이 만료되었으면 null 반환

//     const token = this.storage.getItem(this.key);
//     return token;
//   }

//   remove() {
//     this.storage.removeItem(this.key);
//     this.storage.removeItem("expiration");
//   }

//   get duration() {
//     const now = new Date();
//     const expirationDate = this.storage.getItem("expiration");
//     if (!expirationDate) return null; // 토큰이 없음

//     const date = new Date(expirationDate);
//     const duration = date.getTime() - now.getTime();

//     if (duration <= 0) return null; // 기한이 만료됨

//     return duration;
//   }
// }

export type OptionType = {
  expiration: string;
  unit: "sec" | "min" | "hour";
  limit: number;
};

export class TokenLocalRepositoryST implements TokenStoragyTest {
  private readonly key = "authToken";
  private readonly storage = window.localStorage; // 이 클래스를 일반화시킬거면 이 부분을 인젝션 시키면 될듯
  private static instance: TokenLocalRepositoryST;
  private static PATTERN = "Singleton"; // Singleton token repository class

  constructor() {
    if (!TokenLocalRepositoryST.instance)
      TokenLocalRepositoryST.instance = this;

    return TokenLocalRepositoryST.instance;
  }

  static getInstance() {
    if (!this.instance) this.instance = new TokenLocalRepositoryST();

    return this.instance;
  }

  private get expiration() {
    return this.getExpiration();
  }

  get duration() {
    const expirationDate = this.storage.getItem("expiration");
    if (!expirationDate) return null; // 토큰이 없음

    const now = new Date();
    const date = new Date(expirationDate);
    const duration = date.getTime() - now.getTime();
    return duration;
  }

  set(value: string, expiration?: string) {
    // 토큰 설정
    this.storage.setItem(this.key, value);

    this.storage.setItem("expiration", expiration ?? this.expiration);
  }

  get() {
    if (!this.duration) return TOKEN_STATE.NOT_EXIST;
    // 토큰이 없음

    if (this.duration <= 0) return TOKEN_STATE.EXPIRED; // 기한이 만료됨

    const token = this.storage.getItem(this.key) as string;
    return token;
  }

  remove() {
    this.storage.removeItem(this.key);
    this.storage.removeItem("expiration");
  }

  getExpiration(options?: Partial<OptionType>): string {
    if (!options) {
      // default expiration 설정
      const expiration = new Date();
      expiration.setMinutes(expiration.getMinutes() + 1);

      return expiration.toISOString();
    }

    if (options.expiration) {
      return options.expiration;
    } else {
      const expiration = new Date();
      const limit = options.limit ?? 1;
      if (options.unit === "hour")
        expiration.setHours(expiration.getHours() + limit);
      if (options.unit === "min")
        expiration.setMinutes(expiration.getMinutes() + limit);
      if (options.unit === "sec")
        expiration.setSeconds(expiration.getSeconds() + limit);

      return expiration.toISOString();
    }
  }
}

// 아래는 좀 더 일반화 시킨 클래스?
// export class TokenRepositoryST extends TokenRepositoryTest {
//   // private readonly key = "authToken";
//   // private readonly storage = window.localStorage;
//   private static instance: TokenRepositoryST;
//   private static PATTERN = "Singleton";

//   constructor(storage: Storagy) {
//     super("authToken", storage);

//     if (!TokenRepositoryST.instance) TokenRepositoryST.instance = this;

//     return TokenRepositoryST.instance;
//   }

//   save(value: string, expiration: string) {
//     this.storage.setItem(this.key, value);
//     this.storage.setItem("expiration", expiration);
//   }

//   get() {
//     if (!this.duration) return null;
//     // 토큰이 없거나, 기한이 만료되었으면 null 반환

//     const token = this.storage.getItem(this.key);
//     return token;
//   }

//   remove() {
//     this.storage.removeItem(this.key);
//     this.storage.removeItem("expiration");
//   }

//   get duration() {
//     const now = new Date();
//     const expirationDate = this.storage.getItem("expiration");
//     if (!expirationDate) return null; // 토큰이 없음

//     const date = new Date(expirationDate);
//     const duration = date.getTime() - now.getTime();
//     console.log("dreuation eee: ", duration);
//     if (duration <= 0) return null; // 기한이 만료됨

//     return duration;
//   }

//   // static getInstance() {
//   //   if (!this.instance) this.instance = new TokenRepositoryST();

//   //   return this.instance;
//   // }
// }

// export const TokenLocalRepositoryST = new TokenRepositoryST(
//   window.localStorage
// );
