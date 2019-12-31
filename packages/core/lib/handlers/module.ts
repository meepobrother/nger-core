import {
  StaticProvider,
  providerToStaticProvider,
  isType,
  INJECTOR_SCOPE,
  Type
} from "@nger/di";
import { ModuleMetadataKey, ModuleOptions } from "../decorator";
import { IClassDecorator } from "@nger/decorator";
import { NgModuleRef } from "../ngModuleRef";
import { compileNgModuleRef, ModuleReduceHandler } from "../compilerFactory";
import {
  prividersToStatic,
  compileAny,
  setStaticProviderWithRoot
} from "./util";
const handler: ModuleReduceHandler<any, ModuleOptions> = (
  init: NgModuleRef<any>,
  current: IClassDecorator<any, ModuleOptions>,
  scope: string | Type<any>
) => {
  const options = current.options;
  let injector = init.injector.create([
    {
      provide: INJECTOR_SCOPE,
      useValue: scope
    }
  ]);
  if (options) {
    const { providers, imports, controllers, id, reducers, entities } = options;
    injector = init.injector.create(
      [
        {
          provide: INJECTOR_SCOPE,
          useValue: scope
        }
      ],
      id || current.type.name
    );
    // 处理imports
    if (imports) {
      init.imports = imports.map(imp => {
        let ref!: NgModuleRef<any>;
        if (isType(imp)) {
          ref = compileNgModuleRef(injector, imp);
        } else {
          ref = compileNgModuleRef(injector, imp.ngModule);
          setStaticProviderWithRoot(
            injector,
            imp.providers.map(it => prividersToStatic(it)).flat()
          );
        }
        return ref;
      });
    }
    // 设置provider
    if (providers) {
      init.providers = providers;
      setStaticProviderWithRoot(
        injector,
        providers.map(it => prividersToStatic(it)).flat()
      );
    }
    // 处理controllers
    if (controllers) {
      injector.setStatic(controllers.map(it => prividersToStatic(it)).flat());
      controllers.map(ctrl => compileAny(undefined, injector, ctrl));
    }
    // 处理reducers
    if (reducers) {
      injector.setStatic(reducers.map(it => prividersToStatic(it)).flat());
      reducers.map(ctrl => compileAny(undefined, injector, ctrl));
    }
    // 处理entities
    if (entities) {
      injector.setStatic(entities.map(it => prividersToStatic(it)).flat());
      entities.map(ctrl => compileAny(undefined, injector, ctrl));
    }
  } else {
    injector = init.injector.create(
      [
        {
          provide: INJECTOR_SCOPE,
          useValue: scope
        }
      ],
      current.type.name
    );
  }
  // 设置依赖注入
  init.injector = injector;
  // module type
  init.injector.setStatic([providerToStaticProvider(current.type)]);
  return init;
};
export const moduleHandler: StaticProvider = {
  provide: ModuleMetadataKey,
  useValue: handler
};
