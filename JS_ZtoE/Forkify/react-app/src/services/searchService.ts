import { Fetchable } from "@/adapters/api/httpClient";

interface Searchable {
  search<T>(query: string): Promise<Response | T>;
  load<T>(id: string): Promise<Response | T>;
  create<T>(data: T): Promise<Response | T>;
}

export default class SearchService implements Searchable {
  private readonly apiKey: string;
  private readonly httpClient: Fetchable;

  constructor(httpClient: Fetchable, apiKey: string) {
    this.httpClient = httpClient;
    this.apiKey = apiKey;
  }

  async search<T>(query: string) {
    try {
      const res = await this.httpClient.get(
        `?search=${query}$key=${this.apiKey}`
      );

      // console.log("res: ", res);
      const { data } = res;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async load<T>(id: string) {
    const res = await this.httpClient.get(`/${id}`);

    // 에러 핸들링

    return (await res.json()) as T;
  }

  async create<V>(data: V) {
    const res = await this.httpClient.post(`?key=${this.apiKey}`, data);

    // 에러 핸들링

    return (await res.json()) as V;
  }
}
