import { HttpParams } from "./params";
import { HttpHeaders } from "./headers";
import { isFormData, isBlob, isArrayBuffer } from "./util";
export enum HttpEventType {
  Sent,
  UploadProgress,
  ResponseHeader,
  DownloadProgress,
  Response,
  User
}

export interface HttpProgressEvent {
  type: HttpEventType.DownloadProgress | HttpEventType.UploadProgress;
  loaded: number;
  total?: number;
}

export interface HttpDownloadProgressEvent extends HttpProgressEvent {
  type: HttpEventType.DownloadProgress;
  partialText?: string;
}

export interface HttpUploadProgressEvent extends HttpProgressEvent {
  type: HttpEventType.UploadProgress;
}
export interface HttpSentEvent {
  type: HttpEventType.Sent;
}
export interface HttpUserEvent<T> {
  type: HttpEventType.User;
}
export interface HttpJsonParseError {
  error: Error;
  text: string;
}
export type HttpEvent<T> =
  | HttpSentEvent
  | HttpHeaderResponse
  | HttpResponse<T>
  | HttpProgressEvent
  | HttpUserEvent<T>;
export abstract class HttpResponseBase {
  readonly headers: HttpHeaders;
  readonly status: number;
  readonly statusText: string;
  readonly url: string | null;
  readonly ok: boolean;
  readonly type!: HttpEventType.Response | HttpEventType.ResponseHeader;
  constructor(
    init: {
      headers?: HttpHeaders;
      status?: number;
      statusText?: string;
      url?: string;
    },
    defaultStatus: number = 200,
    defaultStatusText: string = "OK"
  ) {
    // If the hash has values passed, use them to initialize the response.
    // Otherwise use the default values.
    this.headers = init.headers || new HttpHeaders();
    this.status = init.status !== undefined ? init.status : defaultStatus;
    this.statusText = init.statusText || defaultStatusText;
    this.url = init.url || null;
    // Cache the ok value to avoid defining a getter.
    this.ok = this.status >= 200 && this.status < 300;
  }
}

export class HttpHeaderResponse extends HttpResponseBase {
  constructor(
    init: {
      headers?: HttpHeaders;
      status?: number;
      statusText?: string;
      url?: string;
    } = {}
  ) {
    super(init);
  }
  readonly type: HttpEventType.ResponseHeader = HttpEventType.ResponseHeader;
  clone(
    update: {
      headers?: HttpHeaders;
      status?: number;
      statusText?: string;
      url?: string;
    } = {}
  ): HttpHeaderResponse {
    // Perform a straightforward initialization of the new HttpHeaderResponse,
    // overriding the current parameters with new ones if given.
    return new HttpHeaderResponse({
      headers: update.headers || this.headers,
      status: update.status !== undefined ? update.status : this.status,
      statusText: update.statusText || this.statusText,
      url: update.url || this.url || undefined
    });
  }
}
export class HttpResponse<T> extends HttpResponseBase {
  readonly body: T | null;
  constructor(
    init: {
      body?: T | null;
      headers?: HttpHeaders;
      status?: number;
      statusText?: string;
      url?: string;
    } = {}
  ) {
    super(init);
    this.body = init.body !== undefined ? init.body : null;
    const contentType = this.detectContentTypeHeader();
    if (contentType) this.headers.set("content-type", contentType);
  }
  readonly type: HttpEventType.Response = HttpEventType.Response;
  detectContentTypeHeader(): string | null {
    // An empty body has no content type.
    if (this.body === null) {
      return null;
    }
    // FormData bodies rely on the browser's content type assignment.
    if (isFormData(this.body)) {
      return null;
    }
    // Blobs usually have their own content type. If it doesn't, then
    // no type can be inferred.
    if (isBlob(this.body)) {
      return this.body.type || null;
    }
    // Array buffers have unknown contents and thus no type can be inferred.
    if (isArrayBuffer(this.body)) {
      return null;
    }
    // Technically, strings could be a form of JSON data, but it's safe enough
    // to assume they're plain strings.
    if (typeof this.body === "string") {
      return "text/plain";
    }
    // `HttpUrlEncodedParams` has its own content-type.
    if (this.body instanceof HttpParams) {
      return "application/x-www-form-urlencoded;charset=UTF-8";
    }
    // Arrays, objects, and numbers will be encoded as JSON.
    if (
      typeof this.body === "object" ||
      typeof this.body === "number" ||
      Array.isArray(this.body)
    ) {
      return "application/json";
    }
    // No type could be inferred.
    return null;
  }
  clone(): HttpResponse<T>;
  clone(update: {
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  }): HttpResponse<T>;
  clone<V>(update: {
    body?: V | null;
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  }): HttpResponse<V>;
  clone(
    update: {
      body?: any | null;
      headers?: HttpHeaders;
      status?: number;
      statusText?: string;
      url?: string;
    } = {}
  ): HttpResponse<any> {
    return new HttpResponse<any>({
      body: update.body !== undefined ? update.body : this.body,
      headers: update.headers || this.headers,
      status: update.status !== undefined ? update.status : this.status,
      statusText: update.statusText || this.statusText,
      url: update.url || this.url || undefined
    });
  }
}
export class HttpErrorResponse extends HttpResponseBase implements Error {
  readonly name = "HttpErrorResponse";
  readonly message: string;
  readonly error: any | null;
  readonly ok = false;

  constructor(init: {
    error?: any;
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
  }) {
    // Initialize with a default status of 0 / Unknown Error.
    super(init, 0, "Unknown Error");
    // If the response was successful, then this was a parse error. Otherwise, it was
    // a protocol-level failure of some sort. Either the request failed in transit
    // or the server returned an unsuccessful status code.
    if (this.status >= 200 && this.status < 300) {
      this.message = `Http failure during parsing for ${init.url ||
        "(unknown url)"}`;
    } else {
      this.message = `Http failure response for ${init.url ||
        "(unknown url)"}: ${init.status} ${init.statusText}`;
    }
    this.error = init.error || null;
  }
}
