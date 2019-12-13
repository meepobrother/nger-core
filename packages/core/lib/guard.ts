import { Injector } from "@nger/di";
export interface CanActivate {
    canActivate(injector: Injector): boolean;
}
export function isCanActivate(val: any): val is CanActivate {
    return val && typeof val.canActivate === 'function'
}
export interface CanLoad {
    canLoad(injector: Injector): boolean;
}
export function isCanLoad(val: any): val is CanLoad {
    return val && typeof val.canLoad === 'function'
}
