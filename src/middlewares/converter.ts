import { Request, Response, NextFunction } from "express";
import { camelCase, snakeCase } from "change-case-object";


const caseConverterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.body && typeof req.body === "object") {
        req.body = camelCase(req.body);
    }

    const originalSend = res.send;

    res.send = function (body?: any) {
        if (body && typeof body === "object") {
            body = snakeCase(body);

            if (body?.data?.profile_image) {
                body.data.profile_image = `${req.protocol}://${req.get("host")}/${body.data.profile_image}`;
            }
        }

        if (body && typeof body === "string") {
            body = JSON.parse(body);

            if (body?.data?.profile_image) {
                body.data.profile_image = `${req.protocol}://${req.get("host")}/${body.data.profile_image}`;
            }

            body = snakeCase(body);
            body = JSON.stringify(body);
        }

        return originalSend.call(this, body);
    };

    next();
};

export { caseConverterMiddleware };
