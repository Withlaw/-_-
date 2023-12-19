import { Fetchable } from "@/adapters/httpClient";

interface Searchable {
  search<T>(query: string): Promise<Response | T>;
  load<T>(id: string): Promise<Response | T>;
  create<T>(data: T): Promise<Response | T>;
}

export default class SearchService implements Searchable {
  private readonly apiKey: string;
  private httpClient: Fetchable;

  constructor(httpClient: Fetchable, apiKey: string) {
    this.httpClient = httpClient;
    this.apiKey = apiKey;
  }

  async search<T>(query: string) {
    const res = await this.httpClient.get(
      `?search=${query}$key=${this.apiKey}`
    );
    return res.json() as T;
  }

  async load<T>(id: string) {
    const res = await this.httpClient.get(`/${id}`);

    // 에러 핸들링

    return res.json() as T;
  }
  async create<V>(data: V) {
    const res = await this.httpClient.post(`?key=${this.apiKey}`, data);

    // 에러 핸들링

    return res.json() as V;
  }
}
