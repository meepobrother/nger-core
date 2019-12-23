import { Injector, InjectFlags } from '@nger/di'
import { PlatformRef } from './platform_ref';
import { ALLOW_MULTIPLE_PLATFORMS, PLATFORM_INITIALIZER } from './token';
let _platform: PlatformRef;
export function getPlatform(): PlatformRef | null {
    return _platform && !_platform.destroyed ? _platform : null;
}
export function createPlatform(injector: Injector): PlatformRef {
    if (_platform && !_platform.destroyed &&
        !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
        throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
    }
    _platform = injector.get(PlatformRef);
    const inits = (injector.get<Function[]>(PLATFORM_INITIALIZER, [], InjectFlags.Optional) || []).flat();
    if (inits) inits.map((init: any) => init())
    return _platform;
}
