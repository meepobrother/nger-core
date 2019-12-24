import { StaticProvider, providerToStaticProvider, isType, INJECTOR_SCOPE, Injector } from "@nger/di";
import { ModuleMetadataKey, ModuleOptions } from "../decorator";
import { IClassDecorator } from "@nger/decorator";
import { NgModuleRef } from "../ngModuleRef";
import { compileNgModuleRef } from "../compilerFactory";
import { prividersToStatic, compileAny, getNger } from "./util";
import { INJECTOR } from "@nger/di/lib/injector_ng";
const handler = (init: NgModuleRef<any>, current: IClassDecorator<any, ModuleOptions>) => {
    init.injector = init.injector.create([], current.type.name)
    const options = current.options;
    // 设置依赖注入
    init.injector.setStatic([providerToStaticProvider(current.type)])
    if (options) {
        const { providers, imports, exports, controllers, id } = options;
        init.injector.setStatic([{
            provide: INJECTOR_SCOPE,
            useValue: id || current.type
        }]);
        // 处理imports
        if (imports) {
            init.imports = imports.map(imp => {
                let ref!: NgModuleRef<any>;
                if (isType(imp)) {
                    ref = compileNgModuleRef(init.injector, imp)
                } else {
                    ref = compileNgModuleRef(init.injector, imp.ngModule)
                    init.injector.setStatic(imp.providers.map(it => prividersToStatic(it)).flat())
                }
                if (ref.exports) ref.exports.map(it => {
                    const nger = getNger(init.injector, it);
                    if (nger.classes.length > 0) {
                        nger.classes.map(it => {
                            if (it.metadataKey === ModuleMetadataKey) {
                                const exportRef = ref.getModuleRef(it.type);
                                if (exportRef) {
                                    const records = exportRef.injector.getRecords();
                                    records.forEach((it, token) => {
                                        if (token === Injector || token === INJECTOR || token === INJECTOR_SCOPE) { } else {
                                            init.injector.setStatic([{
                                                provide: token,
                                                useFactory: () => {
                                                    return exportRef.get(token)
                                                },
                                                deps: []
                                            }])
                                        }
                                    })
                                }
                            }
                            else {
                                init.injector.setStatic([{
                                    provide: it.type,
                                    useFactory: () => ref.get(it.type),
                                    deps: []
                                }])
                            }
                        })
                    }else{
                        init.injector.setStatic([{
                            provide: it,
                            useFactory: () => ref.get(it),
                            deps: []
                        }])
                    }
                });
                return ref;
            })
        }
        // 设置provider
        if (providers) {
            init.injector.setStatic(providers.map(it => prividersToStatic(it)).flat());
        }
        // 处理controllers
        if (controllers) {
            init.injector.setStatic(controllers.map(imp => providerToStaticProvider(imp)).flat())
            controllers.map(ctrl => compileAny(undefined, init.injector, ctrl));
        }
        // 处理exports
        if (exports) {
            init.exports = exports;
        }
    }
    return init;
}
export const moduleHandler: StaticProvider = {
    provide: ModuleMetadataKey,
    useValue: handler
}
