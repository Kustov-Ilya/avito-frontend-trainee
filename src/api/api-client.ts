import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { IApiClient } from "@/types/api-client";

export const API_ENDPOINT =
  "https://free-to-play-games-database.p.rapidapi.com/api/";
const MAX_RETRY_COUNT = 3;
const RETRY_DELAY_MS = 5 * 1000;

export default class ApiClient implements IApiClient {
  private instance: AxiosInstance;

  constructor(baseUrl = API_ENDPOINT, timeout = 5000) {
    this.instance = this.createInstance(baseUrl, timeout);
  }

  public async get<TResponse, TRequest = any>(
    url: string,
    object?: TRequest,
    config?: AxiosRequestConfig<TResponse>
  ) {
    if (config) {
      config.params = object;
    } else {
      config = { params: object };
    }
    return await this.instance.get<TResponse>(url, config);
  }

  public async post<TResponse, TRequest>(
    url: string,
    object: TRequest,
    config?: AxiosRequestConfig
  ) {
    return await this.instance.post<TResponse>(url, object, config);
  }

  public async put<TResponse, TRequest>(
    url: string,
    object: TRequest,
    config?: AxiosRequestConfig
  ) {
    return await this.instance.put<TResponse>(url, object, config);
  }

  public async delete<TResponse, TRequest>(
    url: string,
    object: TRequest,
    config?: AxiosRequestConfig
  ) {
    if (config) {
      config.data = object;
    } else {
      config = { data: object };
    }
    return await this.instance.delete<TResponse>(url, config);
  }

  private createInstance(baseUrl: string, timeout: number) {
    const instance = axios.create({
      baseURL: baseUrl,
      timeout: timeout,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    });
    instance.interceptors.request.use(
      (response) => response,
      (error) => {
        console.error(`Request error: ${error}`);
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const config = error.config;
        config.retryCount = config.retryCount || 0;

        if (config.retryCount >= MAX_RETRY_COUNT) {
          return Promise.reject(error);
        }

        config.retryCount += 1;
        return new Promise((resolve) =>
          setTimeout(
            () => resolve(this.instance.request(config)),
            RETRY_DELAY_MS
          )
        );
      }
    );

    return instance;
  }
}
