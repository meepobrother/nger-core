
import { StaticProvider, InjectionToken, INJECTOR_SCOPE, topInjector } from '@nger/di';
import { createPlatform, getPlatform } from './createPlatform';
import { assertPlatform } from './assertPlatform';
import { PlatformRef } from './platform_ref';
import { ALLOW_MULTIPLE_PLATFORMS, PLATFORM_ID } from './token';
export function createPlatformFactory(
    parentPlatformFactory: ((extraProviders?: StaticProvider[]) => PlatformRef) | null,
    name: string,
    providers: StaticProvider[] = []
): (extraProviders?: StaticProvider[]) =>
        PlatformRef {
    const desc = `Platform: ${name}`;
    const MASK = new InjectionToken(desc);
    return (extraProviders: StaticProvider[] = []) => {
        let platform = getPlatform();
        if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
            if (parentPlatformFactory) {
                const allProviders = providers
                    .concat(extraProviders)
                    .concat({ provide: MASK, useValue: true })
                    .concat({
                        provide: PLATFORM_ID,
                        useValue: name
                    })
                parentPlatformFactory(allProviders);
            } else {
                const injectedProviders: StaticProvider[] =
                    providers
                        .concat(extraProviders)
                        .concat({ provide: MASK, useValue: true })
                        .concat({
                            provide: INJECTOR_SCOPE,
                            useValue: 'platform'
                        })
                        .concat({
                            provide: PLATFORM_ID,
                            useValue: name
                        });
                createPlatform(topInjector.create(injectedProviders, desc));
            }
        }
        return assertPlatform(MASK);
    };
}
