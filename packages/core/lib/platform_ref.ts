import { APP_INITIALIZER } from "./token";
import { Injector, Type } from "@nger/di";
import { NgModuleRef } from "./ngModuleRef";
import { remove } from "./lang";
import { compileNgModuleRef } from "./compilerFactory";
export abstract class NgModuleBootstrap {
  abstract run<T>(moduleRef: NgModuleRef<T>): Promise<any>;
}
export interface BootstrapOptions {}
export class PlatformRef {
  private _modules: NgModuleRef<any>[] = [];
  private _destroyListeners: Function[] = [];
  private _destroyed: boolean = false;
  get injector(): Injector {
    return this._injector;
  }
  get destroyed() {
    return this._destroyed;
  }
  constructor(private _injector: Injector) {}

  async bootstrapModule<M>(moduleType: Type<M>): Promise<NgModuleRef<M>> {
    // todo 注入启动参数
    const moduleRef = compileNgModuleRef(this.injector, moduleType, "root");
    moduleRef.onDestroy(() => remove(this._modules, moduleRef));
    const appInits = moduleRef.get(APP_INITIALIZER);
    if (appInits) {
      for (let i = 0; i < appInits.length; i++) {
        await appInits[i]();
      }
    }
    await this._moduleDoBootstrap(moduleRef);
    await moduleRef.onInit();
    this.onDestroy(moduleRef.destroy.bind(moduleRef));
    return moduleRef;
  }

  private _moduleDoBootstrap(moduleRef: NgModuleRef<any>) {
    const bootstrap = this.injector.get<NgModuleBootstrap[]>(
      NgModuleBootstrap,
      []
    );
    const tasks: any[] = [];
    bootstrap.map((b: NgModuleBootstrap) => {
      tasks.push(b.run(moduleRef));
    });
    return Promise.all(tasks);
  }

  // 注册销毁钩子
  onDestroy(callback: () => void): void {
    this._destroyListeners.push(callback);
  }

  addModuleRef(moduleRef: NgModuleRef<any>) {
    this._modules.push(moduleRef);
  }

  // 销毁
  destroy() {
    if (this._destroyed) {
      throw new Error("The platform has already been destroyed!");
    }
    this._modules.slice().forEach(module => module.destroy());
    this._destroyListeners.forEach(listener => listener());
    this._destroyed = true;
  }
}
