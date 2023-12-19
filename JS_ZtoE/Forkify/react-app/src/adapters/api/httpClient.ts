/*
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;

  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  */

import { AxiosInstance } from "axios";

export interface Fetchable {
  // fetch(endpoint: string, config?: RequestInit): Promise<Response>;
  get<T = any>(url: string, config?: T): any;
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
  private readonly baseURL: string;
  private readonly fetcher: AxiosInstance;

  constructor(baseURL: string, fetcher: AxiosInstance) {
    this.baseURL = baseURL;
    this.fetcher = fetcher;
  }

  async get<T = any>(endpoint: string) {
    const res = await this.fetcher.get(endpoint);

    const { data } = res;
    return data;
  }

  async post<V = any>(endpoint: string, payload?: V) {
    const res = await this.fetcher.post(endpoint, payload);

    const { data } = res;
    return data;
  }
}
