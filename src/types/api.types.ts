export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type ApiErrorPayload = {
  message?: string;
  code?: string;
  details?: unknown;
};

export type RequestOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | object | null;
};
