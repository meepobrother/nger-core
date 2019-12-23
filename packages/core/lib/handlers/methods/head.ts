import { StaticProvider, Injector } from "@nger/di";
import { ControllerOptions, GetOptions, HeadMetadataKey } from "../../decorator";
import { IMethodDecorator, IClassDecorator } from "@nger/decorator";
import { createHandler } from "./util";
const handler = (injector: Injector, item: IMethodDecorator<any, GetOptions>, parent: IClassDecorator<any, ControllerOptions>, path: string) => {
    return createHandler(injector, item, path)('HEAD')
}
export const headHandler: StaticProvider = {
    provide: HeadMetadataKey,
    useValue: handler
}