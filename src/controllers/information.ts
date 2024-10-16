import { Request, Response } from "express";

import BannerRepo from "@repositories/banner";
import ServiceRepo from "@repositories/service";
import { sendResponse } from "@utils/response";


const listBanner = async (req: Request, res: Response) => {
    const result = await BannerRepo.getAllBanners({
        protocol: req.protocol,
        host: req.get("host")!
    });
    return sendResponse(res, result, 200, "Sukses");
}

const listService = async (req: Request, res: Response) => {
    const result = await ServiceRepo.getAllServices({
        protocol: req.protocol,
        host: req.get("host")!
    });
    return sendResponse(res, result, 200, "Sukses");
}

export { listBanner, listService };
