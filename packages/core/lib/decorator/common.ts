import { createClassDecorator, IClassDecorator } from '@nger/decorator';
import { Provider, Type, ModuleWithProviders } from '@nger/di';
import { PathParams } from './types';
/**
 * Module
 */
export const ModuleMetadataKey = `ModuleMetadataKey`;
export interface ModuleOptions {
    id?: any;
    providers?: (Provider[] | Provider)[];
    imports?: Array<Type<any> | ModuleWithProviders<any>>;
    exports?: Array<any>;
    bootstrap?: Array<Type<any>>;
    controllers?: (Provider[] | Provider)[];
}
export const Module = createClassDecorator<ModuleOptions>(ModuleMetadataKey);
export const NgModule = Module;

/**
 * controller
 */
export const ControllerMetadataKey = `ControllerMetadataKey`;
export interface ControllerOptions {
    path: PathParams;
    providers?: (Provider | Provider[])[];
    useGuards?: Type<any>[];
}
export const Controller = createClassDecorator<ControllerOptions | string>(ControllerMetadataKey, (item: IClassDecorator<any, ControllerOptions | string>) => {
    if (item.options) {
        if (typeof item.options === 'string') {
            item.options = {
                providers: [],
                path: item.options
            }
        } else {
            item.options = {
                providers: [],
                path: ``,
                ...item.options
            }
        }
    } else {
        item.options = {
            providers: [],
            path: ``
        }
    }
});
