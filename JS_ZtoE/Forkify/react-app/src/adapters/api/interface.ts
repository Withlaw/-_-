/*
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  */

export default interface Fetchy {
  get<T = any>(endpoint: string): Promise<T | any>;
  post<T>(endpoint: string, payload?: BodyInit | null): Promise<T | any>;
  delete(endpoint: string): Promise<Response>;
  // post<T, U>(endpoint: string, payload?: U): Promise<T | any>;
}
