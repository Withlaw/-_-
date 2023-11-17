import DataRepository from './Interface';

class LocalDataRepository implements DataRepository {
  save = (key: string, value: string) =>
    window.localStorage.setItem(key, value);
  get = (key: string) => window.localStorage.getItem(key);
  remove = (key: string) => window.localStorage.removeItem(key);
}

export default new LocalDataRepository();
