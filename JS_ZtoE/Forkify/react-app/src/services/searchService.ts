// 도메인 로직
// 데이터 변환 등

import { Fetchable, HttpClientAxios } from "@/adapters/api";
import { Recipe } from "@/model/search";

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
    const res = await this.httpClient.get<T>(
      `?sear1ch=${query}$key=${this.apiKey}`
    );

    // console.log("res: ", res);
    const {
      data: { recipes },
    } = res;

    return recipes.map((recipe: Recipe) => new Recipe(recipe));
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
