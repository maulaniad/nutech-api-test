import { Request, Response } from "express";

import MembershipRepo from "@repositories/membership";
import { sendResponse } from "@utils/response";
import { makePassword } from "@utils/password";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeEmail = (email: string) => {
    const [localPart, domainPart] = email.toLowerCase().split("@");
    return `${localPart}@${domainPart}`;
}

const createMembership = async (req: Request, res: Response) => {
    const { email, firstName, lastName, password } = req.body;

    if (!emailRegex.test(email)) {
        sendResponse(res, null, 400, "Parameter email tidak sesuai format");
        return;
    }

    const result = await MembershipRepo.getMembershipByEmail(normalizeEmail(email));
    if (result) {
        sendResponse(res, null, 400, "Email sudah terdaftar");
        return;
    }

    const membership = await MembershipRepo.createMembership(
        normalizeEmail(email),
        firstName,
        lastName,
        await makePassword(password)
    );

    if (!membership) {
        sendResponse(res, null, 400, "Registrasi gagal");
        return;
    }

    sendResponse(res, null, 200, "Registrasi berhasil silahkan login");
};

export { createMembership };
