import { Request, Response } from "express";

import UserRepo from "@repositories/user";
import { sendResponse } from "@utils/response";
import { generateToken } from "@utils/token";
import { makePassword, checkPassword } from "@utils/password";


const normalizeEmail = (email: string) => {
    const [localPart, domainPart] = email.toLowerCase().split("@");
    return `${localPart}@${domainPart}`;
}

const membershipRegistration = async (req: Request, res: Response) => {
    const { email, firstName, lastName, password } = req.body;

    const result = await UserRepo.getUserByEmail(normalizeEmail(email));
    if (result) {
        sendResponse(res, null, 400, "Email sudah terdaftar");
        return;
    }

    const membership = await UserRepo.createUser(
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

const membershipLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const membership = await UserRepo.getUserObject("email", normalizeEmail(email));
    if (!membership) {
        sendResponse(res, null, 400, "Email atau password salah");
        return;
    }

    if (!await checkPassword(password, membership.password)) {
        sendResponse(res, null, 400, "Email atau password salah");
        return;
    }

    const token = generateToken({ oid: membership.oid, email: membership.email });
    sendResponse(res, { token: token }, 200, "Login sukses");
}

const membershipProfile = async (req: Request, res: Response) => {
    const membership = await UserRepo.getUserByEmail(req.user.email);
    sendResponse(res, membership, 200, "Sukses");
}

const membershipProfileUpdate = async (req: Request, res: Response) => {
    let { firstName, lastName } = req.body;

    const currentMembership = await UserRepo.getUserByEmail(req.user.email);
    if (!currentMembership) {
        sendResponse(res, null, 400, "User tidak valid");
        return;
    }

    if (!firstName) firstName = currentMembership.first_name;
    if (!lastName) lastName = currentMembership.last_name;

    const updatedMembership = await UserRepo.updateUser(firstName, lastName, currentMembership.email);
    sendResponse(res, updatedMembership, 200, "Sukses");
}

export { membershipRegistration, membershipLogin, membershipProfile, membershipProfileUpdate };
