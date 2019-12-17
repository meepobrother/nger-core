import { Injector } from "@nger/di";

export abstract class ErrorHandler {
    abstract handleError(error: any, injector?: Injector): void;
}

export class DefaultErrorHandler extends ErrorHandler {
    handleError(error: any, injector?: Injector): void {
        console.log(error)
    }
}