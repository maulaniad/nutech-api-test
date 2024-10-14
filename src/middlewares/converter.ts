import { camelCase, snakeCase } from "change-case-object";


export const caseConverterMiddleware = (req: any, res: any, next: any) => {
    if (req.body && typeof req.body === "object") {
        req.body = camelCase(req.body);
    }

    const originalSend = res.send;

    res.send = function (body?: any) {
        if (body && typeof body === "object") {
            body = snakeCase(body);
        }

        if (body && typeof body === "string") {
            body = JSON.parse(body);
            body = snakeCase(body);
            body = JSON.stringify(body);
        }

        return originalSend.call(this, body);
    };

    next();
};
