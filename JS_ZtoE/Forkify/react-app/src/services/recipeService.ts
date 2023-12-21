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
  upload(data: any): Promise<any>;
  // load?<T>(id: string): Promise<T>;
  // create<T>(data: T): Promise<Response | T>;
}
// SearchSerive -> RecipeService
export default class RecipeService implements RecipeServiceI {
  private readonly apiKey: string;
  private readonly httpClient: Fetchable;

  constructor(httpClient: Fetchable, apiKey: string) {
    this.httpClient = httpClient;
    this.apiKey = apiKey;
  }

  async search<T>(query: string) {
    const res = await this.httpClient.get<T>(
      `?search=${query}$key=${this.apiKey}`
    );

    console.log("service layer: ", res);

    // const {
    //   data: { recipes },
    // } = res;

    // const recipes: Recipe[] = res.data.recipes;
    const { recipes } = res.data;
    // domain: data transform
    // return recipes.map(recipe => new Recipe(recipe));
    return recipes.map((recipe: Recipe) => new Recipe(recipe));
  }

  async download<T>(id: string) {
    const res = await this.httpClient.get<T>(`/${id}`);

    // const recipe: RecipeDetail = res.data.recipe;
    // const recipe: RecipeDetail = new RecipeDetail(res.data.recipe);

    return res.data;
  }

  async upload(data: any): Promise<any> {
    const res = await this.httpClient.post(
      `?key=${this.apiKey}`,
      JSON.stringify(data)
    );

    console.log("upload res: ", res);

    return res.data;
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
