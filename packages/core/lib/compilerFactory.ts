import { ModuleMetadataKey, ModuleOptions, Injector, providerToStaticProvider, StaticProvider, isTypeProvider, InjectionToken } from "@nger/di";
import { getINgerDecorator, Type, IClassDecorator } from '@nger/decorator';
export interface CompilerOptions { }
export class CompilerFactory {
    createCompiler(options?: CompilerOptions[]): Compiler {
        return new Compiler(options);
    }
}

// 编译器
export class Compiler {
    constructor(public options?: CompilerOptions[]) { }
    // 编译
    async compileModuleAsync<M>(moduleType: Type<M>, injector: Injector): Promise<NgModuleFactory<M>> {
        const nger = getINgerDecorator(moduleType);
        const mdouleMetadata = nger.classes.find(it => it.metadataKey === ModuleMetadataKey) as IClassDecorator<any, ModuleOptions>;
        if (mdouleMetadata) {
            const { options, parameters } = mdouleMetadata;
            if (options) {
                let { id, providers, imports, exports: _exports, bootstrap } = options;
                let ngModuleFactorys: NgModuleFactory<any>[] = [];
                if (imports) {
                    await Promise.all(imports.map(async (it) => {
                        if (isTypeProvider(it)) {
                            const ngModuleFactory = await this.compileModuleAsync(it, injector);
                            ngModuleFactory.exports.map(ext => {
                                const record = ngModuleFactory.injector.getRecord(ext)
                                if (record) injector.setRecord(ext, record)
                            });
                            ngModuleFactorys.push(ngModuleFactory);
                        } else {
                            const ngModuleFactory = await this.compileModuleAsync(it.ngModule, injector);
                            ngModuleFactory.injector.setStatic(it.providers.map(it => providerToStaticProvider(it)));
                            ngModuleFactory.exports.map(ext => {
                                const record = ngModuleFactory.injector.getRecord(ext)
                                if (record) injector.setRecord(ext, record)
                            });
                            ngModuleFactorys.push(ngModuleFactory);
                        }
                    }));
                }
                const staticProviders: StaticProvider[] = [];
                if (providers) {
                    providers.map(provider => {
                        staticProviders.push(providerToStaticProvider(provider))
                    });
                }
                staticProviders.push(providerToStaticProvider(moduleType));
                injector.setStatic(staticProviders.filter(it => it.multi));
                const inject = injector.create(staticProviders.filter(it => !it.multi), id);
                const ngModuleFactory = new NgModuleFactory(moduleType, inject, _exports, bootstrap, ngModuleFactorys);
                inject.setStatic([{
                    provide: NgModuleFactory,
                    useValue: ngModuleFactory
                }]);
                return ngModuleFactory;
            }
        }
        return new NgModuleFactory(moduleType, injector, [], undefined, [])
    }
}
export class NgModuleRef<T>{
    instance: T & { ngOnModuleInit?: any };
    injector: Injector;
    imports: NgModuleRef<any>[] = [];
    constructor(instance: T, injector: Injector, imports: NgModuleRef<any>[]) {
        this.injector = injector;
        this.instance = instance;
        this.imports = imports;
    }
    onDestroy(cb: () => void) { }
    destroy() { }
    async onInit(): Promise<NgModuleRef<T>> {
        await Promise.all(this.imports.map(async imp => await imp.onInit()))
        if (this.instance && this.instance.ngOnModuleInit) {
            await this.instance.ngOnModuleInit();
        }
        return this;
    }
}
export class NgModuleFactory<T> {
    injector: Injector;
    exports: any[] = [];
    bootstrap: any;
    type: Type<T>;
    imports: NgModuleFactory<any>[] = [];
    constructor(type: Type<T>, injector: Injector, _exports?: any[], bootstrap?: any, imports?: NgModuleFactory<any>[]) {
        this.injector = injector;
        this.type = type;
        if (_exports) this.exports = _exports;
        if (bootstrap) this.bootstrap = bootstrap;
        if (imports) this.imports = imports;
    }
    create(): NgModuleRef<T> {
        const instance = this.injector.get(this.type);
        const refs = this.imports.map(imp => imp.create())
        return new NgModuleRef<T>(instance, this.injector, refs);
    }
}

export function compileNgModuleFactory<M>(
    injector: Injector,
    options: CompilerOptions,
    moduleType: Type<M>
): Promise<NgModuleFactory<M>> {
    const compilerFactory = injector.get(CompilerFactory) as CompilerFactory;
    const compiler = compilerFactory.createCompiler([options]);
    return compiler.compileModuleAsync(moduleType, injector);
}
