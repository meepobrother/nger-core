import { InjectionToken } from "@nger/di";
import { LogLevel } from "./logger";
/**
 * app id
 */
export const APP_ID = new InjectionToken(`@nger/core APP_ID`);

export const PLATFORM_NAME = new InjectionToken(`@nger/core PLATFORM_NAME`)

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

