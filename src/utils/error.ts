/**
 * Enum for internal error recognition.
 */
const InternalErrorCode = Object.freeze({
    VALIDATION_ERROR: 102,
    FORBIDDEN: 157,
    UNAUTHORIZED: 108,
    NOT_FOUND: 169
});

class InternalAppError extends Error {
    public readonly name: string;
    public readonly message: string;
    public readonly statusCode: number;
    public internalStatusCode: number;

    constructor(message: string, statusCode = 500, internalCode = 0) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode;
        this.internalStatusCode = internalCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends InternalAppError {
    constructor(message: string, statusCode = 400) {
        super(message, statusCode);
        this.internalStatusCode = InternalErrorCode.VALIDATION_ERROR;
    }
}

class ForbiddenError extends InternalAppError {
    constructor(message: string, statusCode = 403) {
        super(message, statusCode);
        this.internalStatusCode = InternalErrorCode.FORBIDDEN;
    }
}

class UnauthorizedError extends InternalAppError {
    constructor(message: string, statusCode = 401) {
        super(message, statusCode);
        this.internalStatusCode = InternalErrorCode.UNAUTHORIZED;
    }
}

class NotFoundError extends InternalAppError {
    constructor(message: string, statusCode = 404) {
        super(message, statusCode);
        this.internalStatusCode = InternalErrorCode.NOT_FOUND;
    }
}

export {
    InternalErrorCode,
    InternalAppError,
    ValidationError,
    ForbiddenError,
    UnauthorizedError,
    NotFoundError
};
