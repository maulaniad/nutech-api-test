import { Router } from "express";

import {
    membershipRegistration,
    membershipLogin,
    membershipProfile
} from "@controllers/membership";
import {
    validateMembershipRegistrationPayload,
    validateMembershipLoginPayload,
} from "@middlewares/membership/validation";
import { jwtAuth } from "@middlewares/auth";


const router = Router();

router.post("/registration", [validateMembershipRegistrationPayload], membershipRegistration);
router.post("/login", [validateMembershipLoginPayload], membershipLogin);
router.get("/profile", [jwtAuth], membershipProfile);

export default router;
