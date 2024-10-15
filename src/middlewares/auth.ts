import { Request, Response, NextFunction } from "express";

import { sendResponse } from "@utils/response";
import { verifyToken } from "@utils/token";


const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return sendResponse(res, null, 401, "Token tidak ditemukan");
    }

    const token = req.headers.authorization.split(" ")[1];
    const validToken = verifyToken(token);
    if (!validToken) {
        return sendResponse(res, null, 401, "Token tidak valid atau kedaluwarsa");
    }

    req.user = validToken;
    next();
}

export { jwtAuth };
