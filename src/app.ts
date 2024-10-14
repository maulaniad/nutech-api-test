import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";

import { caseConverterMiddleware } from "@middlewares/converter";
import membershipRouter from "@routes/membership.routes";
import { sendResponse } from "@utils/response";


const app = express();

app.use(express.json());
app.use(morgan("[server]  :method :url Params: :req[body] :response-time ms"));
app.use(caseConverterMiddleware);

app.use("/membership", membershipRouter);


app.use((req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, null, 404, "Resource tidak ditemukan di server (Invalid method / route)");
});

app.listen(3000, () => {
    console.log("[server]  server is running at http://localhost:3000");
});
