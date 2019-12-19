import { createPlatformFactory, PlatformRef, PLATFORM_INITIALIZER, CompilerFactory, ErrorHandler, ApplicationInitStatus, APP_INITIALIZER } from '../lib';
import { Injector, providerToStaticProvider } from '@nger/di';
import { controllerProvider, injectableProvider } from './controller';
import { DefaultErrorHandler } from './error_handler';
import { ALLOW_MULTIPLE_PLATFORMS } from './token';

export class CoreErrorHandler extends ErrorHandler {
    handleError(error: any, injector?: Injector): void {
        throw error;
    }
}
export const corePlatform = createPlatformFactory(null, 'core', [
    controllerProvider,
    injectableProvider,
    {
        provide: ErrorHandler,
        useClass: DefaultErrorHandler
    },
    {
        provide: ALLOW_MULTIPLE_PLATFORMS,
        useValue: true
    },
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