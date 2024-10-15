import { Response } from "express";


const sendResponse = (
    res: Response,
    data: object | Array<any> | null = null,
    status: number = 200,
    message: string = "OK"
) => {
    res.status(status).json({
        status: status,
        message: message,
        data: data
    });
    return;
};

export { sendResponse };
