import { Injector, InjectFlags, GET_INGER_DECORATOR } from "@nger/di";
import { Type, IClassDecorator } from '@nger/decorator';
import { NgModuleRef } from './ngModuleRef';
import { ModuleMetadataKey } from "./decorator";

export function compileNgModuleRef<M>(
    injector: Injector,
    moduleType: Type<M>
): NgModuleRef<M> {
    const init = new NgModuleRef<M>(injector, moduleType)
    const getDecorator = injector.get(GET_INGER_DECORATOR);
    const nger = getDecorator(moduleType)
    const ngModuleRef = moduleReduce<M, any>(nger.classes, init)
    if (ngModuleRef) return ngModuleRef;
    throw new Error(`Compile Ng ModuleRef Error`)
}
export interface ModuleReduceHandler<T, O> {
    (old: NgModuleRef<T>, current: IClassDecorator<T, O>): NgModuleRef<T>;
}
export function moduleReduce<T, O>(arrs: IClassDecorator<T, O>[], init: NgModuleRef<T>): NgModuleRef<T> {
    return arrs.reduce<NgModuleRef<T>>((prev: NgModuleRef<T>, current: IClassDecorator<T, O>) => {
        if (current.metadataKey) {
            const handler = init.injector.get<ModuleReduceHandler<T, O>>(current.metadataKey, null, InjectFlags.Optional);
            if (handler) return handler(init, current);
        }
        throw new Error(`hander ${ModuleMetadataKey} error`)
    }, init)
}
