import { InjectionToken } from "@nger/di"
import { LogLevel } from "./logger"
import { INext, IResponse, IRequest, IRouter } from "./adapters"
export const APP_ID = new InjectionToken<string>(`@nger/core APP_ID`)
export const REQUEST = new InjectionToken<IRequest>(`@nger/core REQUEST`)
export const RESPONSE = new InjectionToken<IResponse>(`@nger/core RESPONSE`)
export const NEXT = new InjectionToken<INext>(`@nger/core NEXT`)
export const ROUTER = new InjectionToken<IRouter>(`@nger/core ROUTER`)
export const PATH = new InjectionToken<string>(`@nger/core PATH`)
export const RESPONSE_HANDLER = new InjectionToken(`@nger/core RESPONSE_HANDLER`)
export const REQUEST_ID = new InjectionToken(`@nger/core REQUEST_ID`)
export const CONTEXT = new InjectionToken(`@nger/core CONTEXT`)
export const SOURCE = new InjectionToken(`@nger/core SOURCE`)
export const INFO = new InjectionToken(`@nger/core INFO`)
export const GLOBAL = new InjectionToken(`@nger/core GLOBAL`)
export const ROUTER_ACTION_REDUCER_MAP = new InjectionToken<any[]>(`e@nger/core ROUTER_ACTION_REDUCER_MAP`);
export const APP_INITIALIZER = new InjectionToken<Array<() => void>>('Application Initializer');
export const PLATFORM_INITIALIZER = new InjectionToken<Array<() => void>>('Platform Initializer');
export const ALLOW_MULTIPLE_PLATFORMS = new InjectionToken<boolean>('AllowMultipleToken');
export const PLATFORM_ID = new InjectionToken<string>(`PLATFORM_ID`)
export const LOGGER_LEVEL = new InjectionToken<LogLevel[]>(`LOGGER_LEVEL`);
