import { Response } from "express";


const sendResponse = (
    res: Response,
    data: object | Array<any> | null = null,
    status: number = 200,
    message: string = "OK",
    internalStatus: number = 0,
) => {
    res.status(status).json({
        status: internalStatus,
        message: message,
        data: data
    });
};

export { sendResponse };
