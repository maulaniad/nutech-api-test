import { Router } from "express";

import { listBanner } from "@controllers/information";


const router = Router();

router.get("/banner", listBanner);

export default router;
