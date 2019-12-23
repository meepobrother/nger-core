import { Injector } from "@nger/di";
import { ROUTES, REQUEST } from "../../token";
import { IMethodDecorator } from "@nger/decorator";
import { isCanLoad } from "../../guard";
import { GuardError } from "./error";

export function createHandler(injector: Injector, item: IMethodDecorator, path: string) {
    return (method: string) => {
        const options = item.options;
        if (options) {
            const platformInjector = injector.getInjector('platform');
            platformInjector.setStatic([{
                provide: ROUTES,
                useFactory: () => {
                    const instance = injector.get(item.type);
                    const methodHandler = Reflect.get(instance, item.property);
                    return {
                        method: method,
                        path: `${path}${options.path}`,
                        factory: () => {
                            const pass = (options.useGuards || []).map((it: any) => injector.get(it)).every((it: any) => {
                                if (isCanLoad(it)) {
                                    return it.canLoad(injector);
                                }
                                return true;
                            });
                            // const req = injector.get(REQUEST);
                            if (pass) return methodHandler();
                            throw new GuardError();
                        }
                    }
                },
                deps: [],
                multi: true,
                noCache: true
            }])
        }
    }
}