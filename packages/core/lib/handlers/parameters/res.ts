import { StaticProvider, ParameterHandler, Injector } from "@nger/di";
import { WithPipesOptions, ResponseMetadataKey } from "../../decorator";
import { IParameterDecorator } from "@nger/decorator";
import { RESPONSE } from "../../token";
const handler: ParameterHandler = (handler: Function, parameters: Array<any>, instance: any, injector: Injector, parameter: IParameterDecorator<any, WithPipesOptions>): void => {
    const res = injector.get(RESPONSE)
    Reflect.set(parameters, parameter.parameterIndex, res)
}
export const resHandler: StaticProvider = {
    provide: ResponseMetadataKey,
    useValue: handler
}