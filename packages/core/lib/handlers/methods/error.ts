export class CoreError extends Error {
    code: number;
    constructor(message: string) {
        super(message)
    }
}

export class GuardError extends CoreError {
    code: number = 403;
    constructor() {
        super(`FORBIDDEN`)
    }
}

export class ServiceError extends CoreError {
    code: number = 500;
    constructor() {
        super(`SERVICE ERROR`)
    }
}

export class NotFoundError extends CoreError {
    code: number = 404;
    constructor() {
        super(`NOT FOUND ERROR`)
    }
}
