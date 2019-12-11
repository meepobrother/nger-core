
import { StaticProvider, InjectionToken, Injector } from '@nger/di';
import { ALLOW_MULTIPLE_PLATFORMS, createPlatform, getPlatform } from './createPlatform';
import { assertPlatform } from './assertPlatform';
import { PlatformRef } from './platform_ref';
export function createPlatformFactory(
    parentPlatformFactory: ((extraProviders?: StaticProvider[]) => PlatformRef) | null,
    name: string,
    providers: StaticProvider[] = []
): (extraProviders?: StaticProvider[]) =>
        PlatformRef {
    const desc = `Platform: ${name}`;
    const marker = new InjectionToken(desc);
    return (extraProviders: StaticProvider[] = []) => {
        let platform = getPlatform();
        if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
            if (parentPlatformFactory) {
                const allProviders = providers
                    .concat(extraProviders)
                    .concat({ provide: marker, useValue: true })
                parentPlatformFactory(allProviders);
            } else {
                const injectedProviders: StaticProvider[] =
                    providers
                        .concat(extraProviders)
                        .concat({ provide: marker, useValue: true });
                createPlatform(Injector.create({ providers: injectedProviders, name: desc }));
            }
        }
        return assertPlatform(marker);
    };
}
