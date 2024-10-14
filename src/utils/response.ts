import { Response } from "express";


const sendResponse = (
    res: Response,
    data: object | Array<any> | null = null,
    status: number = 200,
    message: string = "OK"
) => {
    return res.status(status).json({
        status: status,
        message: message,
        data: data
    });
};

export { sendResponse };
