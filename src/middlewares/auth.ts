import { Request, Response, NextFunction } from "express";

import { verifyToken } from "@utils/token";
import { ValidationError, UnauthorizedError } from "@utils/error";


const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        throw new ValidationError("Token tidak ditemukan");
    }

    const token = req.headers.authorization.split(" ")[1];
    const validToken = verifyToken(token);
    if (!validToken) {
        throw new UnauthorizedError("Token tidak valid atau kedaluwarsa");
    }

    req.user = validToken;
    next();
}

export { jwtAuth };
