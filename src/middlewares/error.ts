import { Request, Response, NextFunction } from "express";

import { sendResponse } from "@utils/response";
import { InternalAppError } from "@utils/error";


const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof InternalAppError) {
        return sendResponse(res, null, err.statusCode, err.message, err.internalStatusCode);
    }

    if (err) {
        return sendResponse(res, null, err.status, err.message);
    }

    next();
};

export { errorHandlerMiddleware };
