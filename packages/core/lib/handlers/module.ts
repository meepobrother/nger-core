import { StaticProvider, providerToStaticProvider, isType, INJECTOR_SCOPE, Type } from "@nger/di";
import { ModuleMetadataKey, ModuleOptions } from "../decorator";
import { IClassDecorator } from "@nger/decorator";
import { NgModuleRef } from "../ngModuleRef";
import { compileNgModuleRef, ModuleReduceHandler } from "../compilerFactory";
import { prividersToStatic, compileAny, setStaticProvider } from "./util";
const handler: ModuleReduceHandler<any, ModuleOptions> = (init: NgModuleRef<any>, current: IClassDecorator<any, ModuleOptions>, scope: string | Type<any>) => {
    const options = current.options;
    const staticProviders: StaticProvider[] = [];
    let injector = init.injector.create([])
    if (options) {
        const { providers, imports, controllers, id } = options;
        injector = init.injector.create([], id || current.type.name)
        staticProviders.push({
            provide: INJECTOR_SCOPE,
            useValue: scope
        });
        // 处理imports
        if (imports) {
            init.imports = imports.map(imp => {
                let ref!: NgModuleRef<any>;
                if (isType(imp)) {
                    ref = compileNgModuleRef(init.injector, imp)
                } else {
                    ref = compileNgModuleRef(init.injector, imp.ngModule)
                    staticProviders.push(...imp.providers.map(it => prividersToStatic(it)).flat())
                }
                return ref;
            })
        }
        // 设置provider
        if (providers) {
            init.providers = providers;
            staticProviders.push(...providers.map(it => prividersToStatic(it)).flat());
        }
        // 处理controllers
        if (controllers) {
            injector.setStatic(controllers.map(imp => providerToStaticProvider(imp)).flat())
            controllers.map(ctrl => compileAny(undefined, init.injector, ctrl));
        }
    } else {
        injector = init.injector.create([], current.type.name)
    }
    // 设置依赖注入
    setStaticProvider(injector, staticProviders)
    init.injector = injector;
    // module type
    init.injector.setStatic([providerToStaticProvider(current.type)]);
    return init;
}
export const moduleHandler: StaticProvider = {
    provide: ModuleMetadataKey,
    useValue: handler
}
