type Utf8AsciiLatin1Encoding = "utf8" | "ascii" | "latin1";
type HexBase64Latin1Encoding = "latin1" | "hex" | "base64";
type TypedArray = Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;
type ArrayBufferView = TypedArray | DataView;
type BinaryLike = string | ArrayBufferView;
export interface Hash {
    update(data: BinaryLike): Hash;
    update(data: string, input_encoding: Utf8AsciiLatin1Encoding): Hash;
    digest(): Buffer;
    digest(encoding: HexBase64Latin1Encoding): string;
}
export abstract class Util {
    abstract createSHA(kind: 'sha512' | string): Hash
}
