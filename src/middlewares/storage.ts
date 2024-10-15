import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

import settings from "@configs/settings";


const uploadDir = path.join(__dirname, "../../", settings.app_upload_dir);

const uploadStorageMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    next();
};

export { uploadStorageMiddleware };
