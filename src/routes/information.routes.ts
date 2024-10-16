import { Router } from "express";

import { listBanner, listService } from "@controllers/information";
import { jwtAuth } from "@middlewares/auth";


const router = Router();

router.get("/banner", listBanner);
router.get("/services", [jwtAuth], listService);

export default router;
