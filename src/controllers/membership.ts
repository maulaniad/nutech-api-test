import { Request, Response } from "express";

import MembershipRepo from "@repositories/membership";
import { sendResponse } from "@utils/response";
import { generateToken } from "@utils/token";
import { makePassword, checkPassword } from "@utils/password";


const normalizeEmail = (email: string) => {
    const [localPart, domainPart] = email.toLowerCase().split("@");
    return `${localPart}@${domainPart}`;
}

const createMembership = async (req: Request, res: Response) => {
    const { email, firstName, lastName, password } = req.body;

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

const loginMembership = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const membership = await MembershipRepo.getUserObject("email", normalizeEmail(email));
    if (!membership) {
        sendResponse(res, null, 400, "Email atau password salah");
        return;
    }

    const result = await checkPassword(password, membership.password);
    if (!result) {
        sendResponse(res, null, 400, "Email atau password salah");
        return;
    }

    const token = generateToken({ oid: membership.oid, email: membership.email });
    sendResponse(res, { token: token }, 200, "Login sukses");
}

export { createMembership, loginMembership };
