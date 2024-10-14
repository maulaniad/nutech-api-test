import { Request, Response, NextFunction } from "express";

import { sendResponse } from "@utils/response";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    if (!emailRegex.test(email)) {
        sendResponse(res, null, 400, "Parameter email tidak sesuai format");
        return;
    }

    next();
}

const validateMembershipLoginPayload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        sendResponse(res, null, 400, "Request body kosong");
        return;
    }

    const { email, password } = req.body;

    if (!email || !password) {
        sendResponse(res, null, 400, "Data tidak lengkap");
        return;
    }

    if (!emailRegex.test(email)) {
        sendResponse(res, null, 400, "Parameter email tidak sesuai format");
        return;
    }

    next();
}

const validateMembershipProfileUpdatePayload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        sendResponse(res, null, 400, "Request body kosong");
        return;
    }

    const { firstName, lastName } = req.body;

    if (!firstName && !lastName) {
        sendResponse(res, null, 400, "Tidak ada data yang perlu diupdate");
        return;
    }

    next();
}

export {
    validateMembershipRegistrationPayload,
    validateMembershipLoginPayload,
    validateMembershipProfileUpdatePayload
};
