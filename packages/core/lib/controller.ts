import { Injector, InjectFlags, providerToStaticProvider, StaticProvider } from "@nger/di";
import { ControllerOptions, ControllerMetadataKey } from './decorator';
import { PathParams } from './decorator/types';
import {
    getINgerDecorator, INgerDecorator, Type,
    IClassDecorator, IMethodDecorator
} from '@nger/decorator';
import { MethodHandler, ParameterHandler, PropertyHandler, ClassHandler } from './handler';
import { NgModuleRef } from "./types";
export const controllerProvider: StaticProvider = {
    provide: ControllerMetadataKey,
    useValue: (factory: ControllerFactory<any>, decorator: IClassDecorator<any, ControllerOptions>) => {
        if (decorator.options) {
            factory.path = decorator.options.path;
            const { providers } = decorator.options;
            const staticProviders = (providers || []).map(it => {
                if (Array.isArray(it)) {
                    return it.map(i => providerToStaticProvider(i))
                }
                return providerToStaticProvider(it)
            }).flat();
            factory.injector.setStatic(staticProviders)
        }
    }
}
export class ControllerFactory<T> {
    readonly metadata: INgerDecorator<T>;
    path: PathParams;
    readonly injector: Injector;
    readonly imports: NgModuleRef<any>[];
    constructor(public readonly _type: Type<T>, injector: Injector) {
        this.injector = injector.create([providerToStaticProvider(_type)], this._type.name);
        this.metadata = getINgerDecorator(_type);
        this.metadata.classes.map(it => {
            const handler = injector.get<ClassHandler<T, any>>(it.metadataKey);
            if (handler) handler(this, it)
        });
    }
    create(injector?: Injector): T {
        const _injector = (injector || this.injector).create([providerToStaticProvider(this._type)]);
        const instance = _injector.get(this._type);
        const that = this;
        return new Proxy(instance, {
            get(target: any, p: PropertyKey, receiver: any) {
                const callHandler = Reflect.get(target, p);
                const isMethod = that.metadata.methods.some(it => it.property === p);
                if (isMethod) {
                    const decorators = that.metadata.methods.filter(it => it.property === p) as IMethodDecorator<T, any>[];
                    if (decorators && decorators.length > 0) {
                        return (...args: any[]) => {
                            const parameters = new Array(decorators[0].parameters.length);
                            decorators.map(it => {
                                const methodHandler = _injector.get<MethodHandler>(it.metadataKey!, null, InjectFlags.Optional);
                                methodHandler && methodHandler(callHandler, instance, _injector, it);
                                it.parameters.map(parameter => {
                                    const handler = _injector.get<ParameterHandler>(parameter.metadataKey, null, InjectFlags.Optional);
                                    handler && handler(callHandler, parameters, instance, _injector, parameter);
                                })
                            });
                            const pars = parameters.map((it, index) => {
                                return Reflect.get(args, index) || it;
                            })
                            return callHandler.bind(target)(...pars)
                        }
                    }
                    return callHandler;
                } else {
                    that.metadata.properties.filter(it => it.property === p).map(it => {
                        const methodHandler = _injector.get<PropertyHandler>(it.metadataKey!, null, InjectFlags.Optional);
                        methodHandler && methodHandler(callHandler, instance, _injector, it);
                    });
                }
                return callHandler;
            }
        })
    }
}
