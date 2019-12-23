import { StaticProvider, ParameterHandler, Injector } from "@nger/di";
import { WithPipesOptions, QueryMetadataKey } from "../../decorator";
import { IParameterDecorator } from "@nger/decorator";
import { PipeTransform } from '../../pipeTransform'
import { REQUEST } from "../../token";
const handler: ParameterHandler = (handler: Function, parameters: Array<any>, instance: any, injector: Injector, parameter: IParameterDecorator<any, WithPipesOptions>): void => {
    const options = parameter.options;
    const req = injector.get(REQUEST)
    let val: any = req.params;
    if (options) {
        if (options.property) {
            val = req.params.get(options.property)
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
export const queryHandler: StaticProvider = {
    provide: QueryMetadataKey,
    useValue: handler
}