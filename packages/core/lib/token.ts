import { InjectionToken } from "@nger/di"
export const AppToken = new InjectionToken(`AppToken`)
export const RequestToken = new InjectionToken(`RequestToken`)
export const ResponseToken = new InjectionToken(`ResponseToken`)
export const NextToken = new InjectionToken(`NextToken`)
export const RouterToken = new InjectionToken(`RouterToken`)
export const PathToken = new InjectionToken(`PathToken`)
export const ResponseHandlerToken = new InjectionToken(`ResponseHandlerToken`)
export const RequestId = new InjectionToken(`RequestId`)

export const RootActionReducerMapToken = new InjectionToken<any[]>(`RootActionReducerMapToken`);
