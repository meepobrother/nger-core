import { createPlatformFactory, PlatformRef, PLATFORM_INITIALIZER, CompilerFactory, ErrorHandler, ApplicationInitStatus, APP_INITIALIZER } from '../lib';
import { providerToStaticProvider } from '@nger/di';
import { INJECTOR, Injector } from '@nger/di/lib/injector_ng';
export class CoreErrorHandler extends ErrorHandler {
    handleError(error: any): void {
        console.error(error)
    }
}
export const corePlatform = createPlatformFactory(null, 'core', [
    {
        provide: PlatformRef,
        useFactory: (injector: Injector) => new PlatformRef(injector),
        deps: [INJECTOR]
    }, {
        provide: PLATFORM_INITIALIZER,
        useValue: () => { },
        multi: true
    }, {
        provide: APP_INITIALIZER,
        useValue: () => { },
        multi: true
    }, {
        provide: CompilerFactory
    }, {
        provide: ErrorHandler,
        useClass: CoreErrorHandler
    },
    providerToStaticProvider(ApplicationInitStatus)
]);