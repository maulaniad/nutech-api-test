import { Request, Response } from "express";

import UserRepo from "@repositories/user";
import TransactionRepo from "@repositories/transaction";
import WalletRepo from "@repositories/wallet";
import { generateInvoice } from "@utils/invoice";
import { sendResponse } from "@utils/response";
import ServiceRepo from "@repositories/service";


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

const doTransaction = async (req: Request, res: Response) => {
    const { serviceCode } = req.body;

    const serviceResult = await ServiceRepo.getServiceObject(
        {
            protocol: req.protocol,
            host: req.get("host")!
        },
        "service_code",
        serviceCode
    );

    if (!serviceResult) {
        return sendResponse(res, null, 400, "Service atau Layanan tidak ditemukan");
    }

    const userResult = await UserRepo.getUserObject("oid", req.user.oid);
    if (!userResult) {
        return sendResponse(res, null, 400, "User tidak ditemukan");
    }

    const walletResult = await WalletRepo.getWalletByUser(userResult.id);
    if (!walletResult) {
        return sendResponse(res, null, 400, "User tidak memiliki wallet");
    }

    const selectedWallet = walletResult[0];
    if (selectedWallet.balance < serviceResult.serviceTariff) {
        return sendResponse(res, null, 400, "Saldo tidak mencukupi");
    }

    const transactionResult = await TransactionRepo.createTransaction(
        {
            idUser: userResult.id,
            idService: serviceResult.id,
            invoiceNumber: generateInvoice(serviceResult.serviceCode),
            transactionType: "PAYMENT",
            totalAmount: serviceResult.serviceTariff
        }
    );

    const newBalance = selectedWallet.balance - serviceResult.serviceTariff;
    await WalletRepo.updateWalletBalance(selectedWallet.oid, newBalance);

    return sendResponse(res, {
            invoiceNumber: transactionResult.invoiceNumber,
            serviceCode: serviceResult.serviceCode,
            serviceName: serviceResult.serviceName,
            transactionType: transactionResult.transactionType,
            totalAmount: transactionResult.totalAmount,
            createdAt: transactionResult.created_at
        }, 200, "Transaksi berhasil"
    );
}

const transactionHistory = async (req: Request, res: Response) => {
    const { limit, offset } = req.query;
    let queryLimit: number = 0;
    let queryOffset: number = 0;

    if (limit)
        queryLimit = Number(limit);
    if (offset)
        queryOffset = Number(offset);

    const result = await TransactionRepo.getAllTransactions(queryLimit, queryOffset);
    return sendResponse(res, {
            offset: queryOffset,
            limit: queryLimit,
            records: result
        }, 200, "Get Transactions Berhasil"
    );
}

export { getCurrentBalance, topUp, doTransaction, transactionHistory };
