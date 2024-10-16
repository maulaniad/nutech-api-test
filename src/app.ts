import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import path from "path";

import settings from "@configs/settings";
import { caseConverterMiddleware } from "@middlewares/converter";
import { errorHandlerMiddleware } from "@middlewares/error";
import { uploadStorageMiddleware } from "@middlewares/storage";
import membershipRouter from "@routes/membership.routes";
import bannerRouter from "@routes/information.routes";
import { sendResponse } from "@utils/response";


const app = express();

app.use(express.json());
app.use(morgan(settings.console_format));

app.use(uploadStorageMiddleware);
app.use(caseConverterMiddleware);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    return sendResponse(res, null, 200, "Hello, this API was built by Mameng Galuh");
});

app.use("/membership", membershipRouter);
app.use("/information", bannerRouter);

app.use("/" + settings.app_upload_dir, express.static(
    path.join(__dirname, "../", settings.app_upload_dir)
));

app.use((req: Request, res: Response, next: NextFunction) => {
    return sendResponse(res, null, 404, "Resource tidak ditemukan di server (Invalid method / route)");
});

app.use(errorHandlerMiddleware);

app.listen(settings.app_port, () => {
    console.log(`[server]  server is running at http://localhost:${settings.app_port}`);
});
