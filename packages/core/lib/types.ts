import { Injector, Type } from "@nger/di"
import { getModuleProviders } from "./getModuleProviders";
import { isWithOnModuleInit } from './life_hooks';
export class NgModuleFactory<T> {
    moduleType: Type<T>;
    constructor(moduleType: Type<T>) {
        this.moduleType = moduleType;
    }
    create(parentInjector: Injector): NgModuleRef<T> {
        const moduleDef = getModuleProviders(this.moduleType);
        const injector = parentInjector.create(moduleDef.providers, moduleDef.id);
        const deps = moduleDef.imports.map(imp => new NgModuleFactory(imp)).map(fac => fac.create(injector));
        return new NgModuleRef<T>(injector, this.moduleType, deps, moduleDef.exports);
    }
}
export class NgModuleRef<T> {
    injector: Injector;
    instance: T;
    imports: NgModuleRef<any>[] = [];
    exports: { token: any, record: any }[] = [];
    constructor(injector: Injector, instance: Type<T>, imports: NgModuleRef<any>[], exports: any[] = []) {
        this.injector = injector;
        this.exports = this.exports.map(it => ({ token: it, record: this.injector.getRecord(it) }));
        this.imports.map(imp => imp.exports.map(it => {
            injector.setRecord(it.token, it.record);
        }));
        this.instance = injector.get(instance);
        this.imports = imports;
    }
    destroy(): void { }
    onDestroy(callback: () => void): void { }
    async onInit() {
        await Promise.all(this.imports.map(async imp => await imp.onInit()))
        if (isWithOnModuleInit(this.instance)) {
            await this.instance.ngOnModuleInit();
        }
        return this;
    }
}
