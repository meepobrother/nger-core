import { StaticProvider, Injector } from "@nger/di";
import { GetMetadataKey, ControllerOptions, GetOptions, AllMetadataKey } from "../../decorator";
import { IMethodDecorator, IClassDecorator } from "@nger/decorator";
import { createHandler } from "./util";
const handler = (injector: Injector, item: IMethodDecorator<any, GetOptions>, parent: IClassDecorator<any, ControllerOptions>, path: string) => {
    return createHandler(injector, item, path)('ALL')
}
export const allHandler: StaticProvider = {
    provide: AllMetadataKey,
    useValue: handler
}