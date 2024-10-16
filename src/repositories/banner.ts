import db from "@configs/database";


class BannerRepo {
    static readonly getAllBanners = async (protocol: string, host: string) => {
        const result = await db.query(
            "SELECT oid, banner_name, banner_image, description FROM banners"
        );

        const mappedResults = result.rows.map((row) => ({
            oid: row.oid,
            bannerName: row.banner_name,
            bannerImage: `${protocol}://${host}/${row.banner_image}`,
            description: row.description,
        }));

        return mappedResults;
    }
}

export default BannerRepo;
