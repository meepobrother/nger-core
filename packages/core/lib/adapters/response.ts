export interface CookieOptions {
    maxAge?: number;
    signed?: boolean;
    expires?: Date;
    httpOnly?: boolean;
    path?: string;
    domain?: string;
    secure?: boolean;
    encode?: (val: string) => string;
    sameSite?: boolean | string;
}
export interface IResponseHeaders {
    [`set-cookie`]: string;
    [key: string]: string;
}
export interface IResponse {
    headers: IResponseHeaders;
    redirect(url: string): void;
    status(code: number): void;
    render(path: string, obj: any): void;
    send(obj: any): void;
    sendFile(path: string): void;
    download(path: string): void;
    set(field: keyof IResponseHeaders, value: string): void;
    get(field: keyof IResponseHeaders): string;
}
