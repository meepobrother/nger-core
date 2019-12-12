import { Type, ModuleMetadataKey, StaticProvider, isTypeProvider, providerToStaticProvider, ModuleOptions } from '@nger/di';
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
            let { id, providers, imports, exports: _exports, bootstrap } = options;
            if (imports) {
                imports.map(async (it) => {
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
                staticProviders.push(...providers.map(provider => providerToStaticProvider(provider)))
            }
            return {
                providers: staticProviders,
                id: id || moduleType.name,
                imports: staticImports || [],
                exports: _exports || [],
                bootstrap
            }
        }
    }
    return { providers: staticProviders, id: moduleType.name, imports: staticImports, exports: [], bootstrap: undefined };
}
