export * from './assertPlatform';
export * from './compilerFactory';
export * from './createPlatform';
export * from './createPlatformFactory';
export * from './error_handler';
export * from './lang';
export * from './platform_ref';
export * from './life_hooks';
export * from './core';
export * from '@nger/di';
export * from './isDevMode';
export * from './ngModuleRef';
export * from './decorator';
export * from './token';
export * from './pipeTransform';
export * from './guard';
export * from './config';
export * from './handlers'
export * from './logger';
export { setStaticProviderWithRoot } from './handlers/util';

export interface Abstract<T> extends Function {
    prototype: T;
}
