import { IRouter } from "./router";
export interface Application {
    listen(port: number, host: string): Promise<void>;
    use(router: IRouter): void;
}
