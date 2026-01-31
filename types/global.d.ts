declare global {
  declare function fetch<ResponseType = unknown>(
    input: RequestInfo | URL,
    init?: TypedRequestInit,
  ): Promise<TypedResponse<ResponseType>>;

  type TypedRequestInit = RequestInit;

  interface TypedResponse<T> extends Response {
    json(): Promise<T>;
  }
}

export {};
