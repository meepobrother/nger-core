import { IRequest } from './request';
import { IResponse } from './response';
import { INext } from './next';
import { CanLoad } from '../guard';
type PathParams = string | RegExp | Array<string | RegExp>;
export interface IRouter {
    (req: IRequest, res: IResponse, next: INext): any;
    use?(path: PathParams, routers: IRouter, guards: CanLoad[]): any;
    all?(path: PathParams, routers: IRouter, guards: CanLoad[]): any;
    get?(path: PathParams, routers: IRouter, guards: CanLoad[]): any;
    post?(path: PathParams, routers: IRouter, guards: CanLoad[]): any;
    delete?(path: PathParams, routers: IRouter, guards: CanLoad[]): any;
    options?(path: PathParams, routers: IRouter, guards: CanLoad[]): any;
    head?(path: PathParams, routers: IRouter, guards: CanLoad[]): any;
    patch?(path: PathParams, routers: IRouter, guards: CanLoad[]): any;
}
