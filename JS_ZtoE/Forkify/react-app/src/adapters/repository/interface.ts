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
