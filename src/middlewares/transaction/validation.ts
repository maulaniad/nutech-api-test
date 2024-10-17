import { ValidationError } from "@utils/error";
import { Request, Response, NextFunction } from "express";


const validateTransactionTopUpPayload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        throw new ValidationError("Request body kosong", 400);
    }

    const { topUpAmount } = req.body;

    if (!topUpAmount) {
        throw new ValidationError("Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0", 400);
    }

    if (typeof topUpAmount !== "number" || topUpAmount <= 0) {
        throw new ValidationError("Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0", 400);
    }

    next();
}

export { validateTransactionTopUpPayload };
