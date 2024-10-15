import { Request, Response, NextFunction } from "express";

import { sendResponse } from "@utils/response";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateMembershipRegistrationPayload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        return sendResponse(res, null, 400, "Request body kosong");
    }

    const { email, firstName, lastName, password } = req.body;

    if (!email || !firstName || !lastName || !password) {
        return sendResponse(res, null, 400, "Request body tidak lengkap");
    }

    if (!emailRegex.test(email)) {
        return sendResponse(res, null, 400, "Parameter email tidak sesuai format");
    }

    next();
}

const validateMembershipLoginPayload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        return sendResponse(res, null, 400, "Request body kosong");
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return sendResponse(res, null, 400, "Data tidak lengkap");
    }

    if (!emailRegex.test(email)) {
        return sendResponse(res, null, 400, "Parameter email tidak sesuai format");
    }

    next();
}

const validateMembershipProfileUpdatePayload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        return sendResponse(res, null, 400, "Request body kosong");
    }

    const { firstName, lastName } = req.body;

    if (!firstName && !lastName) {
        return sendResponse(res, null, 400, "Tidak ada data yang perlu diupdate");
    }

    next();
}

const validateMembershipProfileImagePayload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.is("multipart/form-data")) {
        return sendResponse(res, null, 400, "Request body harus menggunakan multipart/form-data");
    }

    if (!req.file) {
        return sendResponse(res, null, 400, "Request body kosong");
    }

    next();
}

export {
    validateMembershipRegistrationPayload,
    validateMembershipLoginPayload,
    validateMembershipProfileUpdatePayload,
    validateMembershipProfileImagePayload
};
