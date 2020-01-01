import { moduleHandler } from './module'
import { controllerHandler, ControllerMethodHandler } from './controller'
import { StaticProvider } from '@nger/di'
export const handlers: StaticProvider[] = [
    moduleHandler,
    controllerHandler
]
