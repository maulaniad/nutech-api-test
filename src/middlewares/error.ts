import { Request, Response, NextFunction } from "express";

import { sendResponse } from "@utils/response";


const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        sendResponse(res, null, err.status, err.message);
        return;
    }

    next();
};

export { errorHandlerMiddleware };
