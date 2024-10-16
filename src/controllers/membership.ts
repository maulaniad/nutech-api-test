import { Request, Response } from "express";

import UserRepo from "@repositories/user";
import WalletRepo from "@repositories/wallet";
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
        return sendResponse(res, null, 400, "Email sudah terdaftar");
    }

    const membership = await UserRepo.createUser(
        normalizeEmail(email),
        firstName,
        lastName,
        await makePassword(password)
    );

    if (!membership) {
        return sendResponse(res, null, 400, "Registrasi gagal");
    }

    const resultWallet = await WalletRepo.createWallet(membership.id, "Main Wallet");
    if (!resultWallet) {
        return sendResponse(res, null, 400, "Registrasi gagal");
    }

    return sendResponse(res, null, 200, "Registrasi berhasil silahkan login");
};

const membershipLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const membership = await UserRepo.getUserObject("email", normalizeEmail(email));
    if (!membership) {
        return sendResponse(res, null, 400, "Email atau password salah");
    }

    if (!await checkPassword(password, membership.password)) {
        return sendResponse(res, null, 400, "Email atau password salah");
    }

    const token = generateToken({ oid: membership.oid, email: membership.email });
    return sendResponse(res, { token: token }, 200, "Login sukses");
}

const membershipProfile = async (req: Request, res: Response) => {
    const membership = await UserRepo.getUserByEmail(req.user.email);
    return sendResponse(res, membership, 200, "Sukses");
}

const membershipProfileUpdate = async (req: Request, res: Response) => {
    let { firstName, lastName } = req.body;

    const currentMembership = await UserRepo.getUserByEmail(req.user.email);
    if (!currentMembership) {
        return sendResponse(res, null, 400, "User tidak valid");
    }

    if (!firstName) firstName = currentMembership.first_name;
    if (!lastName) lastName = currentMembership.last_name;

    const updatedMembership = await UserRepo.updateUser(firstName, lastName, currentMembership.email);
    return sendResponse(res, updatedMembership, 200, "Sukses");
}

const membershipProfileImageUpdate = async (req: Request, res: Response) => {
    if (!req.file) {
        return sendResponse(res, null, 500, "File tidak ditemukan / server error");
    }

    const normalizedFilePath = req.file.path.replace(/\\/g, "/");
    const membership = await UserRepo.updateUserProfileImage(normalizedFilePath, req.user.email);
    return sendResponse(res, membership, 200, "Sukses");
}

export {
    membershipRegistration,
    membershipLogin,
    membershipProfile,
    membershipProfileUpdate,
    membershipProfileImageUpdate
};
