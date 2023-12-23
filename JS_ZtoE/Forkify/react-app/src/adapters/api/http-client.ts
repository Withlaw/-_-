import Fetchy from "@/adapters/api/interface";
import { AxiosInstance } from "axios";

// use fetch api
export class HttpClientFetch implements Fetchy {
  private readonly baseURL: string;

  constructor(baseURL: string = "") {
    this.baseURL = baseURL;
  }

  private _timeout(sec: number): Promise<Response> {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${sec} second`));
      }, sec * 1000);
    });
  }

  private _fetch(
    endpoint: RequestInfo | URL,
    configs?: RequestInit
  ): Promise<Response> {
    // fetch 횡단 관심사 설정

    return Promise.race([
      window.fetch(this.baseURL + endpoint, {
        ...configs,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      this._timeout(5),
    ]);
    // return  window.fetch(this.baseURL + endpoint, {
    //   ...configs,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  }

  async get<T = any>(endpoint: string): Promise<T | Response> {
    try {
      const res = await this._fetch(endpoint);
      // if(!res.ok) throw~

      // console.log("fetch client get res: ", res);
      const { data } = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async post<T>(
    endpoint: string,
    payload?: BodyInit | null
  ): Promise<T | Response> {
    try {
      const res = await this._fetch(endpoint, {
        method: "POST",
        body: payload,
      });
      // if(!res.ok) throw~

      return await res.json();
    } catch (error) {
      throw error;
    }
  }
  // async post<T extends BodyInit | null, U = any>(
  //   endpoint: string,
  //   payload?: T
  // ): Promise<U | Response> {
  //   try {
  //     const res = await this._fetch(endpoint, {
  //       method: "POST",
  //       body: payload,
  //     });
  //     // if(!res.ok) throw~

  //     return await res.json();
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async delete(endpoint: string): Promise<Response> {
    try {
      const res = await this._fetch(endpoint, { method: "DELETE" });

      return await res.json();
    } catch (error) {
      throw error;
    }
  }
}

// use axios
export class HttpClientAxios implements Fetchy {
  // export class HttpClientAxios {
  private readonly baseURL: string;
  private readonly fetcher: AxiosInstance;

  constructor(fetcher: AxiosInstance, baseURL: string = "") {
    this.baseURL = baseURL;
    this.fetcher = fetcher;
  }
  // ajax call
  // http response 시나리오
  // 1. 성공
  // 1-1) 적절한 상태(리소스 접근 성공 등) -> return data
  // 1-2) 부적절한 상태 -> throw error
  // 2. 실패 -> throw error
  // *가정: axios 기본설정은 외부에서 처리 후 주입 받음. Fetchable 인터페이스에 있는 메소드만 있으면 됨.

  async get<T = any>(endpoint: string): Promise<T | Response> {
    try {
      const res = await this.fetcher.get<T>(this.baseURL + endpoint);
      // if (res.status !== 200) throw new Error("http response failed");

      const { data } = res;
      return data;
    } catch (error) {
      // const { response } = err as AxiosError;
      // if (response) {
      //   throw { status: response.status, data: response.data };
      // }

      throw error;
    }
  }

  async post<T>(
    endpoint: string,
    payload?: BodyInit | null
  ): Promise<T | Response> {
    try {
      const res = await this.fetcher.post<T>(this.baseURL + endpoint, payload);

      const { data } = res;
      return data;
    } catch (error) {
      throw error;
    }
  }

  // async post<T extends BodyInit | null, U = any>(
  //   endpoint: string,
  //   payload?: T
  // ): Promise<U | Response> {
  //   try {
  //     const res = await this.fetcher.post<U>(this.baseURL + endpoint, payload);

  //     const { data } = res;
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async delete(endpoint: string): Promise<Response> {
    try {
      const res = await this.fetcher.delete(this.baseURL + endpoint);

      const { data } = res;
      return data;
    } catch (error) {
      throw error;
    }
  }
}
