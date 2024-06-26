/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly REACT_APP_API_BASE_URL: string;
    readonly REACT_APP_API_KEY: string;
  }
}
