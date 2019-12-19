import { Injector, Type, StaticProvider, Provider, stringify, isTypeProvider, isClassProvider, isStaticClassProvider, isValueProvider, isFactoryProvider, isExistingProvider, providerToStaticProvider } from "@nger/di"
import { getModuleProviders } from "./getModuleProviders";
import { isWithOnModuleInit } from './life_hooks';
import { ControllerFactory } from "./controller";
export class NgModuleFactory<T> {
    moduleType: Type<T>;
    constructor(moduleType: Type<T>) {
        this.moduleType = moduleType;
    }
    create(parentInjector: Injector): NgModuleRef<T> {
        return new NgModuleRef<T>(parentInjector, this.moduleType);
    }
}
export class NgModuleRef<T> {
    private _destroyListeners: Function[] = [];
    private _destroyed: boolean = false;
    injector: Injector;
    get instance(): T {
        return this.injector.get(this._type)
    }
    imports: NgModuleRef<any>[] = [];
    exports: StaticProvider[] = [];
    providers: StaticProvider[] = [];
    controllers: ControllerFactory<any>[] = [];
    constructor(injector: Injector, private _type: Type<T>) {
        /**
         * 获取依赖项目
         */
        const moduleDef = getModuleProviders(_type);
        /**
         * provider
         */
        this.injector = injector.create([
            {
                provide: NgModuleRef,
                useValue: this
            },
            ...moduleDef.providers,
            ...moduleDef.controllers,
        ], moduleDef.id || _type.name);
        /**
         * imports
         */
        const imports = moduleDef.imports.map(imp => new NgModuleFactory(imp)).map(fac => fac.create(this.injector));
        /**
         * imports
         */
        this.imports = imports;
        /**
         * exports
         */
        this.exports = moduleDef.exports;
        /**
         * exports
         */
        this.injector.setStatic(this.imports.map(child => child.getAllExports()).flat())
        /**
         * controller
         */
        this.controllers = moduleDef.controllers.map(ctrl => {
            const controllerFactory = new ControllerFactory(getStaticProvider(ctrl, this.injector), this.injector);
            this.injector.setStatic([{
                provide: ctrl.provide,
                useFactory: () => controllerFactory.create(),
                deps: []
            }]);
            return controllerFactory;
        });
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
    getAllExports() {
        return this.getAllModuleRef().map(ref => ref.exports).flat()
    }
    async onInit() {
        await Promise.all(this.imports.map(async imp => await imp.onInit()))
        if (isWithOnModuleInit(this.instance)) {
            await this.instance.ngOnModuleInit();
        }
        return this;
    }
}

export function getStaticProvider<T = any>(provider: StaticProvider, injector: Injector): Type<T> {
    let instance: any;
    if (isTypeProvider(provider)) {
        return provider;
    }
    else if (isClassProvider(provider)) {
        return provider.useClass
    }
    else if (isStaticClassProvider(provider)) {
        return provider.useClass
    }
    else if (isValueProvider(provider)) {
        instance = provider.useValue;
    }
    else if (isFactoryProvider(provider)) {
        instance = injector.get<any>(provider.provide);
    }
    else if (isExistingProvider(provider)) {
        instance = injector.get<any>(provider.provide);
    } else {
        instance = injector.get<any>(provider.provide);
    }
    if (instance) {
        const obj = Reflect.getPrototypeOf(instance);
        if (obj) {
            return Reflect.get(obj, 'constructor')
        }
    }
    throw new Error(`can not found Constructor type`)
}
