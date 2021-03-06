import { Injector } from '@nger/di';
import { DefaultErrorHandler, ErrorHandler } from './error_handler';
import { ALLOW_MULTIPLE_PLATFORMS } from './token';
import { PlatformRef } from './platform_ref';
import { createPlatformFactory } from './createPlatformFactory';
import { handlers } from './handlers';
import { Config, DefaultConfig } from './config';
export const corePlatform = createPlatformFactory(null, 'core', [
    ...handlers,
    {
        provide: Config,
        useClass: DefaultConfig
    },
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
    }
]);
