import { StaticProvider, Injector } from "@nger/di";
import { GetMetadataKey, ControllerOptions, PostOptions } from "../../decorator";
import { IMethodDecorator, IClassDecorator } from "@nger/decorator";
import { createHandler } from "./util";
const handler = (injector: Injector, item: IMethodDecorator<any, PostOptions>, parent: IClassDecorator<any, ControllerOptions>, path: string) => {
    return createHandler(injector, item, path)('POST')
}
export const postHandler: StaticProvider = {
    provide: GetMetadataKey,
    useValue: handler
}