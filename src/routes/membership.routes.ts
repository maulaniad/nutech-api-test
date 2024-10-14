import { Router } from "express";

import { createMembership, loginMembership } from "@controllers/membership";
import {
    validateMembershipRegistrationPayload,
    validateMembershipLoginPayload,
} from "@middlewares/membership/validation";


const router = Router();

router.post("/registration", [validateMembershipRegistrationPayload], createMembership);
router.post("/login", [validateMembershipLoginPayload], loginMembership);

export default router;
