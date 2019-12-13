import { Injector } from "@nger/di";
import { IPropertyDecorator, IParameterDecorator, IMethodDecorator, IClassDecorator, INgerDecorator } from '@nger/decorator';
import { ControllerFactory } from "./controller";
export interface ParameterHandler<T = any, O = any> {
    (handler: Function, parameters: Array<any>, instance: T, injector: Injector, parameter: IParameterDecorator<any, O>): void;
}
export interface PropertyHandler<T = any, O = any> {
    (value: any, instance: T, injector: Injector, parameter: IPropertyDecorator<any, O>): void;
}
export interface MethodHandler<T = any, O = any> {
    (handler: Function, instance: T, injector: Injector, parameter: IMethodDecorator<any, O>): void;
}
export interface HttpMethodHandler<T = any, O = any> {
    (controller: ControllerFactory<T>, decorator: IMethodDecorator<T, O>): void;
}
export interface HttpResponseHandler<T> {
    (data: T, injector: Injector): T;
}
export interface ClassHandler<T, O> {
    (factory: ControllerFactory<T>, decorator: IClassDecorator<T, O>): void;
}