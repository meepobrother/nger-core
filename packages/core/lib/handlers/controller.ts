import { StaticProvider, Injector, INJECTOR_SCOPE, InstanceRef } from "@nger/di";
import { ControllerMetadataKey, ControllerOptions } from "../decorator";
import { IClassDecorator, IMethodDecorator } from "@nger/decorator";
import { prividersToStatic, getNger } from "./util";
const controllers = new Set();
export function getControllers() {
  return [...controllers]
}
export interface HttpMethodHandler {
  (
    injector: Injector,
    item: IMethodDecorator<any, any>,
    parent: IClassDecorator<any, ControllerOptions>,
    path: string
  ): any;
}
const handler = (
  init: any,
  ctrl: IClassDecorator<any, ControllerOptions>,
  injector: Injector
) => {
  const controllerInjector = injector.create([{
    provide: INJECTOR_SCOPE,
    useValue: ctrl.type
  }], ctrl.type.name);
  const options = ctrl.options;
  if (options) {
    let { providers, path } = options;
    if (providers) {
      controllerInjector.setStatic(
        providers.map(it => prividersToStatic(it)).flat()
      );
    }
    if (path) {
      const nger = getNger(controllerInjector, ctrl.type);
      controllers.add(new InstanceRef(nger, controllerInjector))
    }
  }
};
export const controllerHandler: StaticProvider = {
  provide: ControllerMetadataKey,
  useValue: handler
};
