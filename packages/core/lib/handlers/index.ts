import { moduleHandler } from './module'
import { controllerHandler } from './controller'
import { StaticProvider } from '@nger/di'
export const handlers: StaticProvider[] = [
    moduleHandler,
    controllerHandler
]
