import { Injector, providerToStaticProvider } from '@nger/di';
import { controllerProvider, injectableProvider } from './controller';
import { DefaultErrorHandler, ErrorHandler } from './error_handler';
import { ALLOW_MULTIPLE_PLATFORMS, APP_INITIALIZER, PLATFORM_INITIALIZER, GET_INGER_DECORATOR } from './token';
import { CompilerFactory } from './compilerFactory'
import { ApplicationInitStatus } from './application_init_status'
import { PlatformRef } from './platform_ref'
import { createPlatformFactory } from './createPlatformFactory'
import { getINgerDecorator } from '@nger/decorator';
export class CoreErrorHandler extends ErrorHandler {
    handleError(error: any, injector?: Injector): void {
        throw error;
    }
}
export const corePlatform = createPlatformFactory(null, 'core', [
    {
        provide: GET_INGER_DECORATOR,
        useValue: getINgerDecorator
    },
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