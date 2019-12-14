import { Type, StaticProvider, isTypeProvider } from '@nger/di';
import { ModuleMetadataKey, ModuleOptions } from './decorator';
import { providerToStaticProvider } from './providerToStaticProvicer';
import { getINgerDecorator, IClassDecorator } from '@nger/decorator';
export function getModuleProviders(moduleType: Type<any>) {
    const staticProviders: StaticProvider[] = [];
    const staticImports: any[] = [];
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
                        staticProviders.push(...it.providers.map(it => providerToStaticProvider(it)));
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
            return {
                providers: staticProviders,
                id: id || moduleType.name,
                imports: staticImports || [],
                exports: _exports || [],
                bootstrap,
                controllers: controllers || []
            }
        }
    }
    return { providers: staticProviders, id: moduleType.name, imports: staticImports, exports: [], controllers: [], bootstrap: undefined };
}
