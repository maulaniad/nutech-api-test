import db from "@configs/database";


interface HostInfo {
    protocol: string;
    host: string;
}

class ServiceRepo {
    static readonly getAllServices = async (hostInfo: HostInfo, serviceCode: string | null = null) => {
        let sql = "SELECT oid, service_code, service_name, service_icon, service_tariff FROM services";
        const params = [];

        if (serviceCode) {
            sql += " WHERE service_code = $1";
            params.push(serviceCode);
        }

        const result = await db.query(sql, params);
        if (result.rows.length <= 0) {
            return null;
        }

        const mappedResults = result.rows.map((row) => ({
            oid: row.oid,
            serviceCode: row.service_code,
            serviceName: row.service_name,
            serviceIcon: `${hostInfo.protocol}://${hostInfo.host}/${row.service_icon}`,
            serviceTariff: row.service_tariff
        }));

        return mappedResults;
    }

    static readonly getServiceObject = async (
        hostInfo: HostInfo,
        param: string | null = null,
        value: any = null
    ) => {
        let sql = `
            SELECT id, oid, service_code, service_name, service_icon, service_tariff
            FROM services
        `;
        const params = [];

        if (param && value) {
            sql += ` WHERE ${param} = $1`;
            params.push(value);
        }

        const result = await db.query(sql, params);
        if (result.rows.length <= 0) {
            return null;
        }

        const mappedResults = result.rows.map((row) => ({
            id: row.id,
            oid: row.oid,
            serviceCode: row.service_code,
            serviceName: row.service_name,
            serviceIcon: `${hostInfo.protocol}://${hostInfo.host}/${row.service_icon}`,
            serviceTariff: row.service_tariff
        }));

        return mappedResults[0];
    }
}

export default ServiceRepo;
