import { Request, Response } from "express";

import UserRepo from "@repositories/user";
import TransactionRepo from "@repositories/transaction";
import WalletRepo from "@repositories/wallet";
import { generateInvoice } from "@utils/invoice";
import { sendResponse } from "@utils/response";


const getCurrentBalance = async (req: Request, res: Response) => {
    // const walletName = req.query.wallet;

    const user = await UserRepo.getUserObject("oid", req.user.oid);
    if (!user) {
        return sendResponse(res, null, 400, "User tidak ditemukan");
    }

    const userWallet = await WalletRepo.getWalletByUser(user.id);
    if (!userWallet) {
        return sendResponse(res, null, 400, "User tidak memiliki wallet");
    }

    return sendResponse(res, { balance: userWallet[0].balance }, 200, "Get Balance Berhasil");
}

const topUp = async (req: Request, res: Response) => {
    const { topUpAmount } = req.body;

    const user = await UserRepo.getUserObject("oid", req.user.oid);
    if (!user) {
        return sendResponse(res, null, 400, "User tidak ditemukan");
    }

    const userWallet = await WalletRepo.getWalletByUser(user.id);
    if (!userWallet) {
        return sendResponse(res, null, 400, "User tidak memiliki wallet");
    }

    TransactionRepo.createTransaction(
        {
            idUser: user.id,
            idService: 13,
            invoiceNumber: generateInvoice("TOPUP"),
            transactionType: "TOPUP",
            totalAmount: topUpAmount
        }
    );

    const newBalance = userWallet[0].balance + topUpAmount;
    const result = await WalletRepo.updateWalletBalance(userWallet[0].oid, newBalance);

    return sendResponse(res, result, 200, "Top Up Balance Berhasil");
}

export { getCurrentBalance, topUp };
