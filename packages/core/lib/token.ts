import { InjectionToken } from "@nger/di";
/**
 * app id
 */
export const APP_ID = new InjectionToken(`@nger/core APP_ID`);

export const PLATFORM_NAME = new InjectionToken(`@nger/core PLATFORM_NAME`)

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
