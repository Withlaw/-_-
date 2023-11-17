export default interface DataRepository {
  save: (key: string, value: string) => void;
  get: (key: string) => string | null;
  remove: (key: string) => void;
}
