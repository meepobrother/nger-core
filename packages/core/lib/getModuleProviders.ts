import { Type, StaticProvider, isTypeProvider, providerToStaticProvider, stringify, Injector, InjectionToken } from '@nger/di';
import { ModuleMetadataKey, ModuleOptions } from './decorator';
import { getINgerDecorator, IClassDecorator } from '@nger/decorator';
import { GET_INGER_DECORATOR } from './token'
export function getModuleProviders(moduleType: Type<any>, injector: Injector): {
    providers: StaticProvider[],
    id: string,
    imports: Type<any>[],
    exports: StaticProvider[],
    controllers: StaticProvider[],
    bootstrap: Type<any>[]
} {
    const staticProviders: StaticProvider[] = [];
    const staticImports: any[] = [];
    const getINgerDecorator = injector.get(GET_INGER_DECORATOR)
    const nger = getINgerDecorator(moduleType);
    staticProviders.push(providerToStaticProvider(moduleType));
    const mdouleMetadata = nger.classes.find(it => it.metadataKey === ModuleMetadataKey) as IClassDecorator<any, ModuleOptions>;
    if (mdouleMetadata) {
        const { options, parameters } = mdouleMetadata;
        if (options) {
            let { id, providers, imports, exports: _exports, bootstrap, controllers } = options;
            if (imports) {
                imports.map((it) => {
                    if (isTypeProvider(it)) {
                        staticProviders.push(providerToStaticProvider(it))
                        staticImports.push(it)
                    } else {
                        staticProviders.push(providerToStaticProvider(it.ngModule))
                        staticImports.push(it.ngModule)
                        staticProviders.push(...it.providers.map(it => {
                            if (Array.isArray(it)) {
                                return it.map(i => providerToStaticProvider(i))
                            } else {
                                return providerToStaticProvider(it)
                            }
                        }).flat());
                    }
                })
            }
            if (providers) {
                providers.map(provider => {
                    if (Array.isArray(provider)) {
                        staticProviders.push(...provider.map(pro => providerToStaticProvider(pro)))
                    } else {
                        staticProviders.push(providerToStaticProvider(provider))
                    }
                })
            }
            const _controllers = (controllers || []).map(it => {
                if (Array.isArray(it)) {
                    return it.map(it => providerToStaticProvider(it))
                } else {
                    return providerToStaticProvider(it)
                }
            }).flat();
            _exports = (_exports || []).map(it => {
                const provider = staticProviders.find(pro => pro.provide === it);
                if (provider) {
                    return provider;
                } else {
                    throw new Error(`can not exports ${stringify(it)}`)
                }
            });
            return {
                providers: staticProviders,
                id: id || moduleType.name,
                imports: staticImports || [],
                exports: _exports || [],
                bootstrap: bootstrap || [],
                controllers: _controllers
            }
        }
    }
    return { providers: staticProviders, id: moduleType.name, imports: staticImports, exports: [], controllers: [], bootstrap: [] };
}
