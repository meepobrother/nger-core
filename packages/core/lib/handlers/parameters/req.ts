import { StaticProvider, ParameterHandler, Injector } from "@nger/di";
import { WithPipesOptions, RequestMetadataKey } from "../../decorator";
import { IParameterDecorator } from "@nger/decorator";
import { REQUEST } from "../../token";
const handler: ParameterHandler = (handler: Function, parameters: Array<any>, instance: any, injector: Injector, parameter: IParameterDecorator<any, WithPipesOptions>): void => {
    const req = injector.get(REQUEST)
    Reflect.set(parameters, parameter.parameterIndex, req)
}
export const reqHandler: StaticProvider = {
    provide: RequestMetadataKey,
    useValue: handler
}