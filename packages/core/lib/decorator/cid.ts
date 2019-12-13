import { createParameterDecorator } from "@nger/decorator";
export const CidMetadataKey = `CidMetadataKey`
export const Cid = createParameterDecorator<string[]>(CidMetadataKey);
