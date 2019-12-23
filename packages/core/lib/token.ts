import { InjectionToken, Type } from "@nger/di";
import { LogLevel } from "./logger";
import { INext, HttpRequest, HttpResponse } from "./http";
import { INgerDecorator } from "@nger/decorator";
/**
 * app id
 */
export const APP_ID = new InjectionToken(`@nger/core APP_ID`);
/**
 * 请求
 */
export const REQUEST = new InjectionToken<HttpRequest<any>>(`@nger/core REQUEST`);
/**
 * 响应
 */
export const RESPONSE = new InjectionToken<HttpResponse<any>>(`@nger/core RESPONSE`);
/**
 * 下一个
 */
export const NEXT = new InjectionToken<INext>(`@nger/core NEXT`);
/**
 * 结果处理钩子
 */
export const RESPONSE_HANDLER = new InjectionToken(`@nger/core RESPONSE_HANDLER`);
/**
 * 请求id
 */
export const REQUEST_ID = new InjectionToken(`@nger/core REQUEST_ID`);
/**
 * graphql context
 */
export const CONTEXT = new InjectionToken(`@nger/core CONTEXT`);
/**
 * graphql source
 */
export const SOURCE = new InjectionToken(`@nger/core SOURCE`);
/**
 * graphql info
 */
export const INFO = new InjectionToken(`@nger/core INFO`);
/**
 * global 全局变量
 */
export const GLOBAL = new InjectionToken(`@nger/core GLOBAL`);

/**
 * router action reducer map
 */
export const ROUTER_ACTION_REDUCER_MAP = new InjectionToken<any[]>(`e@nger/core ROUTER_ACTION_REDUCER_MAP`);
/**
 * 系统初始化
 */
export const APP_INITIALIZER = new InjectionToken<Array<() => void>>('Application Initializer');
/**
 * 平台初始化
 */
export const PLATFORM_INITIALIZER = new InjectionToken<Array<() => void>>('Platform Initializer');
/**
 * 允许多个平台
 */
export const ALLOW_MULTIPLE_PLATFORMS = new InjectionToken<boolean>('AllowMultipleToken');
/**
 * 当前平台
 */
export const PLATFORM_ID = new InjectionToken<string>(`PLATFORM_ID`)
/**
 * 日志Level
 */
export const LOGGER_LEVEL = new InjectionToken<LogLevel[]>(`LOGGER_LEVEL`);
