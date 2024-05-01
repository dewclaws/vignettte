/**
 * Options to include with every request from an API client instance.
 */
export interface ExternalAPIOptions {
  baseHeaders?: Record<string, string>;
}

/**
 * A config object supplied to individual external API requests.
 */
export type ExternalAPIRequestConfig = {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: Record<string, string>;
};

/**
 * A thin wrapper around the `fetch` API for the purposes of abstraction.
 */
export default class ExternalAPI {
  private baseUrl: string;
  private baseHeaders: ExternalAPIOptions["baseHeaders"];

  /**
   * Create an external API client to make requests with.
   * @param baseUrl the base URL of the API this instance represents, without a trailing slash.
   * @param options default options to use for each request from this instance.
   */
  constructor(baseUrl: string, options: ExternalAPIOptions = {}) {
    this.baseUrl = baseUrl;

    if (options.baseHeaders) {
      this.baseHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.baseHeaders,
      };
    }
  }

  /**
   * Make a request to the external API that this instance represents.
   * @param endpoint the endpoint to append to the base URL, with a leading slash.
   * @param config request config to use for this request only (method, headers, body).
   * @returns the response from the request, type-cast to an object supplied at call time.
   */
  public async request<T>(
    endpoint: string,
    config?: ExternalAPIRequestConfig
  ): Promise<T> {
    const body = () => {
      if (config) {
        // Coerce body into URLSearchParams or FormData depending on method
        switch (config.method) {
          case "POST":
            const data = new FormData();

            for (const [k, v] of Object.entries(config.body ?? {})) {
              data.append(k, v);
            }

            return data;
          default:
            return new URLSearchParams({ ...config.body });
        }
      }

      // If no body is set, then never mind
      return undefined;
    };

    // Fetch & cast JSON response to type specified when called
    return fetch(this.baseUrl + endpoint, {
      method: config?.method ?? "GET",
      headers: { ...config?.headers, ...this.baseHeaders },
      body: body(),
    }).then((res) => res.json() as T);
  }
}
