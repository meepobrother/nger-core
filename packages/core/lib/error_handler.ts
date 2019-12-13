import { Injector } from "@nger/di";

export abstract class ErrorHandler {
    abstract handleError(error: any, injector: Injector): void;
}