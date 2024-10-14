import { Router } from "express";

import {
    membershipRegistration,
    membershipLogin,
    membershipProfile,
    membershipProfileUpdate
} from "@controllers/membership";
import {
    validateMembershipRegistrationPayload,
    validateMembershipLoginPayload,
    validateMembershipProfileUpdatePayload
} from "@middlewares/membership/validation";
import { jwtAuth } from "@middlewares/auth";


const router = Router();

router.post("/registration", [validateMembershipRegistrationPayload], membershipRegistration);
router.post("/login", [validateMembershipLoginPayload], membershipLogin);
router.get("/profile", [jwtAuth], membershipProfile);
router.put("/profile/update", [jwtAuth, validateMembershipProfileUpdatePayload], membershipProfileUpdate);

export default router;
