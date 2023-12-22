// 도메인 로직
// 데이터 변환 등

import { Fetchable, HttpClientAxios } from "@/adapters/api/http-client";
import {
  Recipe,
  RecipeDetail,
  RecipeDetailData,
} from "@/features/recipe/model";

export interface RecipeServiceI {
  search<T>(query: string): Promise<T>;
  download<T>(id: string): Promise<T>;
  upload<T = any>(payload?: BodyInit | null): Promise<T | any>;
  // create<T>(data: T): Promise<Response | T>;
}

// SearchSerive -> RecipeService
export default class RecipeService implements RecipeServiceI {
  private readonly httpClient: Fetchable;
  private readonly apiKey?: string;

  constructor(httpClient: Fetchable, apiKey?: string) {
    this.httpClient = httpClient;
    this.apiKey = apiKey;
  }

  async search<T>(query: string): Promise<T | any> {
    try {
      const res = await this.httpClient.get<T>(
        `?search=${query}$key=${this.apiKey}`
      );
      // console.log("service layer: ", res);

      let data = res;
      if (res?.data) data = res.data;
      if (res.data?.data) data = res.data.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async download<T>(id: string): Promise<T | any> {
    try {
      const res = await this.httpClient.get<T>(`/${id}`);

      let data = res;
      if (res?.data) data = res.data;
      if (res.data?.data) data = res.data.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async upload<T = any>(payload?: BodyInit | null): Promise<T | any> {
    try {
      const res = await this.httpClient.post<T>(`?key=${this.apiKey}`, payload);
      // const res = await this.httpClient.post<BodyInit | null, T>(
      //   `?key=${this.apiKey}`,
      //   payload
      // );

      console.log("upload res: ", res);

      let data = res;
      if (res?.data) data = res.data;
      if (res.data?.data) data = res.data.data;

      return data;
    } catch (error) {
      throw error;
    }
  }

  // async search<T>(query: string) {
  //   try {
  //     const res = await this.httpClient.get<T>(
  //       `?sear1ch=${query}$key=${this.apiKey}`
  //     );

  //     const {
  //       data: { recipes },
  //     } = res;

  //     return recipes.map((recipe: Recipe) => new Recipe(recipe));
  //     // domain: data transform
  //   } catch (err) {}
  // }

  // async load<T>(id: string) {
  //   const res = await this.httpClient.get(`/${id}`);

  //   // 에러 핸들링

  //   return (await res.json()) as T;
  // }

  // async create<V>(data: V) {
  //   const res = await this.httpClient.post(`?key=${this.apiKey}`, data);

  //   // 에러 핸들링

  //   return (await res.json()) as V;
  // }
}
