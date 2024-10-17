import db from "@configs/database";


interface HostInfo {
    protocol: string;
    host: string;
}

class BannerRepo {
    static readonly getAllBanners = async (hostInfo: HostInfo) => {
        const result = await db.query(
            "SELECT oid, banner_name, banner_image, description FROM banners"
        );

        const mappedResults = result.rows.map((row) => ({
            oid: row.oid,
            bannerName: row.banner_name,
            bannerImage: `${hostInfo.protocol}://${hostInfo.host}/${row.banner_image}`,
            description: row.description,
        }));

        if (mappedResults.length <= 0) {
            return null;
        }

        return mappedResults;
    }
}

export default BannerRepo;
