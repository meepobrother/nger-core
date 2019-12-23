import { Injector } from "@nger/di";
import { ROUTES } from "../../token";
import { IMethodDecorator } from "@nger/decorator";
import { isCanLoad } from "../../guard";
import { GuardError } from "./error";

export function createHandler(injector: Injector, item: IMethodDecorator, path: string) {
    return (method: string) => {
        const options = item.options;
        if (options) {
            injector.setStatic([{
                provide: ROUTES,
                useFactory: () => {
                    const instance = injector.get(item.type);
                    const method = Reflect.get(instance, item.property);
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
                            if (pass) return method();
                            throw new GuardError()
                        }
                    }
                },
                deps: []
            }])
        }
    }
}