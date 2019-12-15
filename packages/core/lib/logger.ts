import { InjectionToken } from "@nger/di";
export type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose';
export const LOGGER_LEVEL = new InjectionToken<LogLevel[]>(`LOGGER_LEVEL`);
export abstract class Logger {
    abstract log(message: any, context?: string): void;
    abstract error(message: any, trace?: string, context?: string): void;
    abstract warn(message: any, context?: string): void;
    abstract debug(message: any, context?: string): void;
    abstract verbose(message: any, context?: string): void;
}
