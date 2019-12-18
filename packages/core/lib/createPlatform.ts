import { Injector, InjectionToken, InjectFlags } from '@nger/di'
import { PlatformRef } from './platform_ref';
export const PLATFORM_INITIALIZER = new InjectionToken<Array<() => void>>('Platform Initializer');
let _platform: PlatformRef;
export function getPlatform(): PlatformRef | null {
    return _platform && !_platform.destroyed ? _platform : null;
}
export const ALLOW_MULTIPLE_PLATFORMS = new InjectionToken<boolean>('AllowMultipleToken');
export function createPlatform(injector: Injector): PlatformRef {
    if (_platform && !_platform.destroyed &&
        !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
        throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
    }
    _platform = injector.get(PlatformRef);
    const inits = injector.get<Function[]>(PLATFORM_INITIALIZER, undefined, InjectFlags.Optional) || [];
    if (inits) inits.forEach((init: any) => init());
    return _platform;
}
