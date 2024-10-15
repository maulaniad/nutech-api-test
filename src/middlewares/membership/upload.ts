import multer from "multer";
import path from "path";

import settings from "@configs/settings";
import { ValidationError } from "@utils/error";


const diskStorage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, settings.app_upload_dir);
    },
    filename: function (req: any, file: any, cb: any) {
        const extension = path.extname(file.originalname);
        cb(null, file.originalname.replace(extension, "") + "-" + Date.now() + extension);
    },
});

const upload = multer({
    storage: diskStorage,
    fileFilter: function (req: any, file: any, cb: any) {
        const allowedExtensions = [".jpg", ".jpeg", ".png"];

        if (allowedExtensions.includes(path.extname(file.originalname))) {
            cb(null, true);
        } else {
            cb(new ValidationError("Format Image tidak sesuai", 400), false);
        }
    }
});

export { upload };
