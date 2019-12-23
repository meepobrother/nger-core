import { Provider, providerToStaticProvider, Injector, Type, InjectFlags, GET_INGER_DECORATOR } from "@nger/di"
import { IClassDecorator } from "@nger/decorator";
import { ModuleMetadataKey } from "../decorator";
export type ProviderArray = Provider | Array<ProviderArray>;

export function prividersToStatic(it: ProviderArray) {
    if (Array.isArray(it)) it.map(i => prividersToStatic(i)).flat()
    else return providerToStaticProvider(it)
}

export function compileAny<M, I>(
    init: I,
    injector: Injector,
    moduleType: Type<M>
): I | undefined {
    const nger = getNger(injector, moduleType)
    const ngModuleRef = anyReduce<M, any, I>(nger.classes, injector, init)
    if (ngModuleRef) return ngModuleRef;
}
export function getNger(injector: Injector, type: Type<any>) {
    const getDecorator = injector.get(GET_INGER_DECORATOR);
    return getDecorator(type)
}
export interface AnyReduceHandler<T, O, I> {
    (old: I, current: IClassDecorator<T, O>, injector: Injector): I;
}
export function anyReduce<T, O, I>(arrs: IClassDecorator<T, O>[], injector: Injector, init: I): I {
    return arrs.reduce<I>((prev: I, current: IClassDecorator<T, O>) => {
        if (current.metadataKey) {
            const handler = injector.get<AnyReduceHandler<T, O, I>>(current.metadataKey, null, InjectFlags.Optional);
            if (handler) return handler(init, current, injector);
        }
        throw new Error(`hander ${ModuleMetadataKey} error`)
    }, init)
}

export function isNgModule() { }
export function isController() { }