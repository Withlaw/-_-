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

export interface Fetchable {
  fetch(endpoint: string, config?: RequestInit): Promise<Response>;
  get<T = any>(url: string, config?: T): any;
  post<V = any, T = any>(url: string, data?: V, config?: T): any;

  // delete<T = any>(url: string, config?: T): Promise<Response>;
  // put<V = any, T = any>(url: string, data?: V, config?: T): Promise<Response>;
  // patch<V = any, T = any>(url: string, data?: V, config?: T): Promise<Response>;
}

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
