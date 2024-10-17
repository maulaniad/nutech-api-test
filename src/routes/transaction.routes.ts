import { Router } from "express";

import { getCurrentBalance, topUp } from "@controllers/transaction";
import { jwtAuth } from "@middlewares/auth";
import { validateTransactionTopUpPayload } from "@middlewares/transaction/validation";

const router = Router();

router.get("/balance", [jwtAuth], getCurrentBalance);
router.post("/topup", [jwtAuth, validateTransactionTopUpPayload], topUp);

export default router;
