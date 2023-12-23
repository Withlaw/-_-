// 저장소
// storage -> repository -> archive ?

export default interface Storagy {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
}

export interface TokenStoragy {
  save(value: string): void;
  get(): string | null;
  remove(): void;
}

export interface TokenStoragyTest {
  save(value: string, expiration: string): void; // expiration 을 옵셔널로. 아예 옵션 객체로 받아도 좋고.
  get(): string | null;
  remove(): void;
}
