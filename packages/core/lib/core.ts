import { createPlatformFactory, PlatformRef, PLATFORM_INITIALIZER, CompilerFactory, ErrorHandler, ApplicationInitStatus, APP_INITIALIZER } from '../lib';
import { Injector, providerToStaticProvider } from '@nger/di';
import { controllerProvider } from './controller';

export class CoreErrorHandler extends ErrorHandler {
    handleError(error: any, injector?: Injector): void {
        throw error;
    }
}
export const corePlatform = createPlatformFactory(null, 'core', [
    controllerProvider,
    {
        provide: PlatformRef,
        useFactory: (injector: Injector) => new PlatformRef(injector),
        deps: [Injector]
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