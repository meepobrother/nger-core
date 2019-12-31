import { StaticProvider, Injector, INJECTOR_SCOPE, NgerRef } from "@nger/di";
import { ControllerMetadataKey, ControllerOptions } from "../decorator";
import { IClassDecorator, IMethodDecorator } from "@nger/decorator";
import { getNger } from "./util";
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
    useValue: ctrl.type.name
  }], ctrl.type.name);
  const nger = getNger(controllerInjector, ctrl.type);
  controllers.add(new NgerRef(nger))
};
export const controllerHandler: StaticProvider = {
  provide: ControllerMetadataKey,
  useValue: handler
};
