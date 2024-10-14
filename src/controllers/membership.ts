import { Request, Response } from "express";

import MembershipRepo from "@repositories/membership";
import { sendResponse } from "@utils/response";
import { makePassword } from "@utils/password";


const createMembership = async (req: Request, res: Response) => {
    const { email, firstName, lastName, password } = req.body;

    const result = await MembershipRepo.getMembershipByEmail(email);
    if (result) {
        sendResponse(res, null, 400, "Email sudah terdaftar");
        return;
    }

    const membership = await MembershipRepo.createMembership(
        email,
        firstName,
        lastName,
        await makePassword(password)
    );

    if (!membership) {
        sendResponse(res, null, 400, "Registrasi gagal");
        return;
    }

    sendResponse(res, membership, 200, "Registrasi berhasil silahkan login");
};

export { createMembership };
