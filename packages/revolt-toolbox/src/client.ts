interface IClientOptions {
  url: string;
  useUpryzing: boolean;
}

/**
 * Represents a client for interacting with a server.
 *
 * @param options - The options for configuring the client.
 * @param options.url - The URL of the server to connect to.
 * @param options.useUpryzing - Whether to use the Upryzing service.
 */
export default class Client {
  private url: string;
  private useUpryzing: boolean;

  /**
   * Initializes a new instance of the `Client` class with the specified options.
   *
   * @param options - The options for configuring the client.
   * @param options.url - The URL of the server to connect to.
   * @param options.useUpryzing - Whether to use the Upryzing service.
   */
  constructor(options: IClientOptions) {
    this.url = options.url;
    this.useUpryzing = options.useUpryzing;
  }

  /**
   * Logs in to the server.
   */
  async login(email: string, password: string): Promise<void> {
    await fetch(this.url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res: any) => {
      return res.json();
    });
  }

  /**
   * Retrieves the API root from the server.
   *
   * @returns The API root response as JSON.
   */
  async getAPIRoot(): Promise<any> {
    fetch(this.url).then((res) => {
      return res.json();
    });
  }

  /**
   * Retrieves the intent from the Upryzing service, if enabled. Otherwise, throws an error.
   *
   * @returns The intent response from the Upryzing service.
   * @throws {Error} If the Upryzing service is not enabled for this client.
   */
  async getIntent(): Promise<any> {
    if (this.useUpryzing) {
      try {
        const res = fetch(`${this.url}/features`);
        if ((await res).status === 404)
          throw "This instance does not run Upryzing.";
      } catch (error) {
        console.error("ERROR:", error)
      }
      
      // TODO: Get intents from Upryzing's API
    } else throw new Error("Upryzing features are not enabled for this client.");
  }

  /**
   * Connects to the server.
   */
  connect(): void {
    // TODO: Connect to the server
  }
}
