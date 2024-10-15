import { Router } from "express";

import {
    membershipRegistration,
    membershipLogin,
    membershipProfile,
    membershipProfileUpdate,
    membershipProfileImageUpdate
} from "@controllers/membership";
import { upload } from "@middlewares/membership/upload";
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
router.put("/profile/image", [jwtAuth, upload.single("file")], membershipProfileImageUpdate);

export default router;
