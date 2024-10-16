import db from "@configs/database";


interface HostInfo {
    protocol: string;
    host: string;
}

class ServiceRepo {
    static readonly getAllServices = async (hostInfo: HostInfo) => {
        const result = await db.query(
            "SELECT oid, service_code, service_name, service_icon, service_tariff FROM services"
        );

        const mappedResults = result.rows.map((row) => ({
            oid: row.oid,
            serviceCode: row.service_code,
            serviceName: row.service_name,
            serviceIcon: `${hostInfo.protocol}://${hostInfo.host}/${row.service_icon}`,
            serviceTariff: row.service_tariff
        }));

        return mappedResults;
    }
}

export default ServiceRepo;
