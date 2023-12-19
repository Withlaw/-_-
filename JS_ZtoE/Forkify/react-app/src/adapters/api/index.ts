// http request 호출
// fetch 시나리오
// 1. 성공
// 2. 실패

/*
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;

  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  */

import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface Fetchable {
  // fetch(endpoint: string, config?: RequestInit): Promise<Response>;
  // get<T = any, V = any>(url: string, config?: T): Promise<V>;
  get<T = any, V = any>(url: string, config?: T): any;
  post<V = any, T = any>(url: string, data?: V, config?: T): any;
}
/*
  export default class HttpClient<T> implements Fetchable {
    private readonly baseURL: string;
    private readonly fetcher: T | undefined;
  
    constructor(baseURL: string, fetcher?: T) {
      this.baseURL = baseURL;
      this.fetcher = fetcher;
    }
  
    fetch(endpoint: string = "", configs?: RequestInit) {
      return window.fetch(`${this.baseURL}${endpoint}`, configs);
    }
  
    get<T = any>(endpoint: string) {
      if (!this.fetcher) {
        return this.fetch(endpoint);
      }
  
      return this.fetcher;
    }
  
    post<V = any>(endpoint: string, data?: V) {
      if (!this.fetcher) {
        return this.fetch(endpoint, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
  
      return this.fetcher;
    }
  }
  */

export class HttpClientFetch implements Fetchable {
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private fetch(endpoint: string = "", configs?: RequestInit) {
    return window.fetch(`${this.baseURL}${endpoint}`, {
      ...configs,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get<T = any>(endpoint: string) {
    const res = await this.fetch(endpoint);
    // if(!res.ok) throw~

    return await res.json();
  }

  async post<V = any>(endpoint: string, data?: V) {
    const res = await this.fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
    // if(!res.ok) throw~

    return await res.json();
  }
}

export class HttpClientAxios implements Fetchable {
  // export class HttpClientAxios {
  private readonly baseURL: string;
  private readonly fetcher: AxiosInstance;

  constructor(baseURL: string, fetcher: AxiosInstance) {
    this.baseURL = baseURL;
    this.fetcher = fetcher;
  }

  // async get<T, V>(endpoint: string, config?: T): Promise<V> {
  async get<T, V>(endpoint: string, config?: T) {
    try {
      const res = await this.fetcher.get<V>(endpoint);
      // console.log("http res: ", res);
      if (res.status !== 200) throw new Error("http response failed");

      const { data } = res;
      return data;
    } catch (err) {
      console.error(err);
      return { data: { recipes: [] } };
    }
    // http request 호출
    // fetch 시나리오
    // 1. 성공
    // 2. 실패 -> 네트워크 요청/응답 관련 에러 처리.
  }

  async post<V = any>(endpoint: string, payload?: V) {
    const res = await this.fetcher.post(endpoint, payload);

    const { data } = res;
    return data;
  }
}
