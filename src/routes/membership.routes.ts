import { Router } from "express";

import { createMembership } from "@controllers/membership";
import { validateMembershipRegistrationPayload } from "@middlewares/membership/validation";


const router = Router();

router.post("/registration", [validateMembershipRegistrationPayload], createMembership);

export default router;
