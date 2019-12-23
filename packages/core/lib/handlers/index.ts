import { moduleHandler } from './module'
import { controllerHandler } from './controller'
import { getHandler } from './methods/get'
import { postHandler } from './methods/post'
import { StaticProvider } from '@nger/di'
import { allHandler } from './methods/all'
import { deleteHandler } from './methods/delete'
import { patchHandler } from './methods/patch'
import { optionsHandler } from './methods/options'
import { headHandler } from './methods/head'

export const handlers: StaticProvider[] = [
    moduleHandler,
    controllerHandler,
    getHandler,
    postHandler,
    allHandler,
    deleteHandler,
    patchHandler,
    optionsHandler,
    headHandler
]

export * from './methods/error';