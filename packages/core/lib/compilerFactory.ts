import { Injector } from "@nger/di";
import { Type } from '@nger/decorator';
import { NgModuleFactory } from './ngModuleRef';
export interface CompilerOptions { }
export class CompilerFactory {
    createCompiler(options?: CompilerOptions[]): Compiler {
        return new Compiler(options);
    }
}
export class Compiler {
    constructor(public options?: CompilerOptions[]) { }
    async compileModuleAsync<M>(moduleType: Type<M>): Promise<NgModuleFactory<M>> {
        return new NgModuleFactory(moduleType)
    }
}
export function compileNgModuleFactory<M>(
    injector: Injector,
    options: CompilerOptions,
    moduleType: Type<M>
): Promise<NgModuleFactory<M>> {
    const compilerFactory = injector.get(CompilerFactory) as CompilerFactory;
    const compiler = compilerFactory.createCompiler([options]);
    return compiler.compileModuleAsync(moduleType);
}