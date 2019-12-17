import { createClassDecorator, createMethodDecorator, Type } from "@nger/decorator";
export const ReducerMetadataKey = `ReducerMetadataKey`;
export interface ReducerOptions {
    name: string;
    store: any;
}
export const Reducer = createClassDecorator<ReducerOptions>(ReducerMetadataKey);
export const CaseMetadataKey = `CaseMetadataKey`;
export const Case = createMethodDecorator<any>(CaseMetadataKey);
