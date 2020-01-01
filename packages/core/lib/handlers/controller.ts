import { StaticProvider, Injector, INJECTOR_SCOPE, NgerRef, MethodHandler } from "@nger/di";
import { ControllerMetadataKey, ControllerOptions } from "../decorator";
import { IClassDecorator, IMethodDecorator } from "@nger/decorator";
import { getNger } from "./util";
export interface ControllerMethodHandler {
  (injector: Injector, item: IMethodDecorator, ctrl: IClassDecorator<any, ControllerOptions>, nger: NgerRef<any>): void;
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
  const ref = new NgerRef(nger, controllerInjector)
  nger.methods.map(it => {
    if (it.metadataKey) {
      const handler = injector.get<ControllerMethodHandler>(it.metadataKey);
      if (handler) handler(injector, it, ctrl, ref)
    }
  })
};
export const controllerHandler: StaticProvider = {
  provide: ControllerMetadataKey,
  useValue: handler
};
