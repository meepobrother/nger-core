/**
 * @publicApi
 */
export abstract class AbstractHttpAdapter<TServer = any>  {
    protected httpServer: TServer;
    constructor(protected readonly instance: any) { }
    public use(...args: any[]) {
        return this.instance.use(...args);
    }
    public get(...args: any[]) {
        return this.instance.get(...args);
    }
    public post(...args: any[]) {
        return this.instance.post(...args);
    }
    public head(...args: any[]) {
        return this.instance.head(...args);
    }
    public delete(...args: any[]) {
        return this.instance.delete(...args);
    }
    public put(...args: any[]) {
        return this.instance.put(...args);
    }
    public patch(...args: any[]) {
        return this.instance.patch(...args);
    }
    public options(...args: any[]) {
        return this.instance.options(...args);
    }
    public listen(port: any, hostname?: any, callback?: any) {
        return this.instance.listen(port, hostname, callback);
    }
    public getHttpServer(): TServer {
        return this.httpServer as TServer;
    }
    public setHttpServer(httpServer: TServer) {
        this.httpServer = httpServer;
    }
    public getInstance<T = any>(): T {
        return this.instance as T;
    }
    abstract close(): void;
    abstract initHttpServer(options: any): any;
    abstract useStaticAssets(...args: any[]): any;
    abstract setViewEngine(engine: string): any;
    abstract getRequestMethod(request: any): any;
    abstract getRequestUrl(request: any): any;
    abstract status(response: any, statusCode: number): any;
    abstract reply(response: any, body: any, statusCode?: number): any;
    abstract render(response: any, view: string, options: any): any;
    abstract redirect(response: any, statusCode: number, url: string): any;
    abstract setErrorHandler(handler: Function): any;
    abstract setNotFoundHandler(handler: Function): any;
    abstract setHeader(response: any, name: string, value: string): any;
    abstract registerParserMiddleware(): any;
    abstract enableCors(options: any): any;
    abstract createMiddlewareFactory(
        requestMethod: any,
    ): (path: string, callback: Function) => any;
    abstract getType(): string;
}