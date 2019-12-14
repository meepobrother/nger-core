import { Injector, Type, InjectFlags } from '@nger/di';
import { compileNgModuleFactory } from './compilerFactory';
import { NgModuleRef, NgModuleFactory } from './types';
import { ErrorHandler } from './error_handler';
import { remove, optionsReducer } from './lang'
import { ApplicationInitStatus } from './application_init_status'
export abstract class NgModuleBootstrap {
    abstract run<T>(moduleRef: NgModuleRef<T>): Promise<any>;
}
export interface BootstrapOptions { }
export class PlatformRef {
    private _modules: NgModuleRef<any>[] = [];
    private _destroyListeners: Function[] = [];
    private _destroyed: boolean = false;
    get injector(): Injector { return this._injector; }
    get destroyed() { return this._destroyed; }
    constructor(private _injector: Injector) { }

    async bootstrapModule<M>(
        moduleType: Type<M>,
        compilerOptions: BootstrapOptions = {}
    ): Promise<NgModuleRef<M>> {
        const options = optionsReducer({}, compilerOptions);
        // 注册injector
        return compileNgModuleFactory<M>(this.injector, options, moduleType)
            .then(moduleFactory => this.bootstrapModuleFactory(moduleFactory));
    }

    async bootstrapModuleFactory<M>(
        moduleFactory: NgModuleFactory<M>
    ): Promise<NgModuleRef<M>> {
        // todo 注入启动参数
        const moduleRef = await moduleFactory.create(this.injector);
        this.injector.setStatic([{
            provide: NgModuleFactory,
            useValue: moduleFactory
        }, {
            provide: NgModuleRef,
            useValue: moduleRef
        }]);
        const exceptionHandler = moduleRef.injector.get(ErrorHandler, null) as ErrorHandler;
        if (!exceptionHandler) {
            throw new Error('No ErrorHandler. Please Regist ErrorHandler');
        }
        moduleRef.onDestroy(() => remove(this._modules, moduleRef));
        const initStatus: ApplicationInitStatus = moduleRef.injector.get(ApplicationInitStatus, null, InjectFlags.Optional);
        if (initStatus) await initStatus.runInitializers();
        await this._moduleDoBootstrap(moduleRef);
        await moduleRef.onInit();
        this.onDestroy(moduleRef.destroy.bind(moduleRef))
        return moduleRef;
    }

    private _moduleDoBootstrap(moduleRef: NgModuleRef<any>) {
        const bootstrap = this.injector.get<NgModuleBootstrap[]>(NgModuleBootstrap, []);
        const tasks: any[] = [];
        bootstrap.map((b: NgModuleBootstrap) => {
            tasks.push(b.run(moduleRef));
        });
        return Promise.all(tasks)
    }

    // 注册销毁钩子
    onDestroy(callback: () => void): void {
        this._destroyListeners.push(callback);
    }

    addModuleRef(moduleRef: NgModuleRef<any>) {
        this._modules.push(moduleRef)
    }

    // 销毁
    destroy() {
        if (this._destroyed) {
            throw new Error('The platform has already been destroyed!');
        }
        this._modules.slice().forEach(module => module.destroy());
        this._destroyListeners.forEach(listener => listener());
        this._destroyed = true;
    }
}

