import db from "@configs/database";


class UserRepo {
    /**
    * Get user object personalized for membership usage.
    **/
    static readonly getUser = async (param: string, value: any) => {
        const sql = `SELECT oid, email, first_name, last_name, profile_image FROM users WHERE "${param}" = $1`;
        const params = [value];

        const result = await db.query(sql, params);
        return result;
    }

    /**
    * Get user object with all attributes/columns from the database.
    **/
    static readonly getUserObject = async (param: string, value: any) => {
        const sql = `SELECT * FROM users WHERE "${param}" = $1`;
        const params = [value];

        const result = await db.query(sql, params);
        return result.rows[0];
    }

    static readonly getUserByEmail = async (email: string) => {
        const result = await this.getUser("email", email);
        if (result.rows.length <= 0) {
            return null;
        }

        return result.rows[0];
    }

    static readonly getUserByOID = async (oid: string) => {
        const result = await this.getUser("oid", oid);
        if (result.rows.length <= 0) {
            return null;
        }

        return result.rows[0]
    }

    static readonly createUser = async (
        email: string,
        firstName: string,
        lastName: string,
        password: string
    ) => {
        const sql = `
            INSERT INTO users (email, first_name, last_name, password)
            VALUES ($1, $2, $3, $4)
            RETURNING oid, email, first_name, last_name, profile_image
        `;
        const params = [email, firstName, lastName, password];

        const result = await db.query(sql, params);
        if (result.rows.length <= 0) {
            return null;
        }

        return result.rows[0];
    };
}

export default UserRepo;
