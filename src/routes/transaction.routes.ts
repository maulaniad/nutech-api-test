import { Router } from "express";

import {
    getCurrentBalance,
    topUp,
    doTransaction,
    transactionHistory
} from "@controllers/transaction";
import { jwtAuth } from "@middlewares/auth";
import { validateTransactionPayload, validateTransactionTopUpPayload } from "@middlewares/transaction/validation";


const router = Router();

router.post("/", [jwtAuth, validateTransactionPayload], doTransaction);
router.get("/balance", [jwtAuth], getCurrentBalance);
router.post("/topup", [jwtAuth, validateTransactionTopUpPayload], topUp);
router.get("/history", [jwtAuth], transactionHistory);

export default router;
