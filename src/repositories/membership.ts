import db from "@configs/database";


class MembershipRepo {
    static readonly getUser = async (param: string, value: any) => {
        const sql = `SELECT oid, email, first_name, last_name, avatar FROM users WHERE "${param}" = $1`;
        const params = [value];

        const result = await db.query(sql, params);
        return result;
    }

    static readonly getMembershipByEmail = async (email: string) => {
        const result = await this.getUser("email", email);

        if (result.rows.length <= 0) {
            return null;
        }

        return {
            oid: result.rows[0].oid,
            email: result.rows[0].email,
            firstName: result.rows[0].first_name,
            lastName: result.rows[0].last_name,
            profileImage: result.rows[0].avatar
        };
    }

    static readonly getMembershipByOid = async (oid: string) => {
        const result = await this.getUser("oid", oid);

        if (result.rows.length <= 0) {
            return null;
        }

        return {
            oid: result.rows[0].oid,
            email: result.rows[0].email,
            firstName: result.rows[0].first_name,
            lastName: result.rows[0].last_name,
            profileImage: result.rows[0].avatar
        };
    }

    static readonly createMembership = async (
        email: string,
        firstName: string,
        lastName: string,
        password: string
    ) => {
        const sql = "INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *";
        const params = [email, firstName, lastName, password];

        const result = await db.query(sql, params);

        if (result.rows.length <= 0) {
            return null;
        }

        return {
            oid: result.rows[0].oid,
            email: result.rows[0].email,
            firstName: result.rows[0].first_name,
            lastName: result.rows[0].last_name,
            profileImage: result.rows[0].avatar
        };
    };
}

export default MembershipRepo;
