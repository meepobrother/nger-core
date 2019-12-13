export abstract class PipeTransform<O> {
    abstract transform(old: any): O;
}
