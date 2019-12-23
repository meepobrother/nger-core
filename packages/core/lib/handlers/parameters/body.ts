import { StaticProvider, ParameterHandler, Injector } from "@nger/di";
import { BodyMetadataKey, WithPipesOptions } from "../../decorator";
import { IParameterDecorator } from "@nger/decorator";
import { PipeTransform } from '../../pipeTransform'
import { REQUEST } from "../../token";
const handler: ParameterHandler = (handler: Function, parameters: Array<any>, instance: any, injector: Injector, parameter: IParameterDecorator<any, WithPipesOptions>): void => {
    const options = parameter.options;
    const req = injector.get(REQUEST)
    let val = req.body;
    if (options) {
        if (options.property) {
            val = Reflect.get(val, options.property)
        }
        if (options.usePipes) {
            options.usePipes.map(it => injector.get(it)).map(it => {
                if (it instanceof PipeTransform) {
                    val = it.transform(val, injector)
                }
            })
        }
    }
    Reflect.set(parameters, parameter.parameterIndex, val)
}
export const bodyHandler: StaticProvider = {
    provide: BodyMetadataKey,
    useValue: handler
}