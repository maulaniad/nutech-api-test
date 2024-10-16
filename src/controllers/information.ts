import { Request, Response } from "express";

import BannerRepo from "@repositories/banner";
import { sendResponse } from "@utils/response";


const listBanner = async (req: Request, res: Response) => {
    const result = await BannerRepo.getAllBanners(req.protocol, req.get("host")!);
    return sendResponse(res, result, 200, "Sukses");
}

export { listBanner };
