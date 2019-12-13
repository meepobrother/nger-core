export abstract class Config<K = string> {
    abstract get<T>(key: K): T;
}
