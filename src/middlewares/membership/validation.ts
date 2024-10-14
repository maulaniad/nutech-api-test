import { Request, Response, NextFunction } from "express";

import { sendResponse } from "@utils/response";



const validateMembershipRegistrationPayload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        sendResponse(res, null, 400, "Request body kosong");
        return;
    }

    const { email, firstName, lastName, password } = req.body;

    if (!email || !firstName || !lastName || !password) {
        sendResponse(res, null, 400, "Data tidak lengkap");
        return;
    }

    next();
}

export { validateMembershipRegistrationPayload };
