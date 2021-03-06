import { createClassDecorator, IClassDecorator } from "@nger/decorator";
import { Provider, Type, ModuleWithProviders, InjectionToken } from "@nger/di";
/**
 * Module
 */
export const ModuleMetadataKey = `ModuleMetadataKey`;
export interface ModuleOptions {
  id?: string;
  providers?: (Provider[] | Provider)[];
  imports?: Array<Type<any> | ModuleWithProviders<any>>;
  controllers?: Type<any>[];
  exports?: Type<any>[];
}
export const Module = createClassDecorator<ModuleOptions>(ModuleMetadataKey);
export const NgModule = Module;

/**
 * controller
 */
export const ControllerMetadataKey = `ControllerMetadataKey`;
export interface ControllerOptions {
  path: string | InjectionToken<string>;
  providers?: (Provider | Provider[])[];
  useGuards?: Type<any>[];
}
export const Controller = createClassDecorator<ControllerOptions | string>(
  ControllerMetadataKey,
  (item: IClassDecorator<any, ControllerOptions | string>) => {
    if (item.options) {
      if (
        typeof item.options === "string" ||
        item.options instanceof InjectionToken
      ) {
        item.options = {
          path: item.options,
          providers: [],
          useGuards: []
        };
      } else {
        item.options = {
          providers: [],
          ...item.options
        };
      }
    } else {
      item.options = {
        path: item.type.name,
        providers: [],
        useGuards: []
      };
    }
  }
);
