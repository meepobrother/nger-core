import { Injector, providerToStaticProvider } from '@nger/di';
import { DefaultErrorHandler, ErrorHandler } from './error_handler';
import { ALLOW_MULTIPLE_PLATFORMS } from './token';
import { ApplicationInitStatus } from './application_init_status';
import { PlatformRef } from './platform_ref';
import { createPlatformFactory } from './createPlatformFactory';
import { moduleHandler } from './handlers/module';
export const corePlatform = createPlatformFactory(null, 'core', [
    moduleHandler,
    {
        provide: ALLOW_MULTIPLE_PLATFORMS,
        useValue: true
    },
    {
        provide: ErrorHandler,
        useClass: DefaultErrorHandler
    },
    {
        provide: PlatformRef,
        useFactory: (injector: Injector) => {
            return new PlatformRef(injector)
        },
        deps: [Injector]
    },
    providerToStaticProvider(ApplicationInitStatus),
]);
