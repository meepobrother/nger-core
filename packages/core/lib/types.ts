import { Injector, Type } from "@nger/di"
import { getModuleProviders } from "./getModuleProviders";
import { isWithOnModuleInit } from './life_hooks';
import { ControllerFactory } from "./controller";
export class NgModuleFactory<T> {
    moduleType: Type<T>;
    constructor(moduleType: Type<T>) {
        this.moduleType = moduleType;
    }
    create(parentInjector: Injector): NgModuleRef<T> {
        const moduleDef = getModuleProviders(this.moduleType);
        const injector = parentInjector.create(moduleDef.providers, moduleDef.id || this.moduleType.name);
        const deps = moduleDef.imports.map(imp => new NgModuleFactory(imp)).map(fac => fac.create(injector));
        const ctrl = moduleDef.controllers.map(ctrl => new ControllerFactory(ctrl, injector))
        return new NgModuleRef<T>(injector, this.moduleType, deps, moduleDef.exports, ctrl);
    }
}
export class NgModuleRef<T> {
    private _destroyListeners: Function[] = [];
    private _destroyed: boolean = false;
    injector: Injector;
    instance: T;
    imports: NgModuleRef<any>[] = [];
    exports: { token: any, record: any }[] = [];
    controllers: ControllerFactory<any>[] = [];
    constructor(injector: Injector, instance: Type<T>, imports: NgModuleRef<any>[], exports: any[] = [], controllers: ControllerFactory<any>[] = []) {
        this.injector = injector.create([{
            provide: NgModuleRef,
            useValue: this
        }]);
        this.exports = exports.map(it => ({ token: it, record: this.injector.getRecord(it) }));
        this.imports.map(imp => imp.exports.map(it => {
            injector.setRecord(it.token, it.record);
        }));
        this.instance = injector.get(instance);
        this.imports = imports;
        this.controllers = controllers;
    }
    destroy(): void {
        if (this._destroyed) {
            throw new Error('The platform has already been destroyed!');
        }
        this.imports.slice().forEach(module => module.destroy());
        this._destroyListeners.forEach(listener => listener());
        this._destroyed = true;
    }
    onDestroy(callback: () => void): void {
        this._destroyListeners.push(callback)
    }
    getAllModuleRef(): NgModuleRef<any>[] {
        const refs: NgModuleRef<any>[] = [];
        refs.push(this);
        const children = this.imports.map(imp => imp.getAllModuleRef()).flat();
        refs.push(...children);
        return refs;
    }
    getAllControllers(): ControllerFactory<any>[] {
        return this.getAllModuleRef().map(ref => ref.controllers).flat()
    }
    async onInit() {
        await Promise.all(this.imports.map(async imp => await imp.onInit()))
        if (isWithOnModuleInit(this.instance)) {
            await this.instance.ngOnModuleInit();
        }
        return this;
    }
}
