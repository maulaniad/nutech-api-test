import db from "@configs/database";


class UserRepo {
    /**
    * Get user object personalized for membership usage.
    **/
    static readonly getUser = async (param: string, value: any) => {
        let sql = `SELECT oid, email, first_name, last_name, profile_image FROM users WHERE "${param}" = $1`;
        const params = [value];

        if (param === "oid") {
            sql += "::UUID"
        }

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
            RETURNING id, oid, email, first_name, last_name, profile_image
        `;
        const params = [email, firstName, lastName, password];

        const result = await db.query(sql, params);
        if (result.rows.length <= 0) {
            return null;
        }

        return result.rows[0];
    };

    static readonly updateUser = async (
        firstName: string,
        lastName: string,
        email: string | null = null,
        oid: string | null = null
    ) => {
        const sql = `
            UPDATE users SET first_name = $1, last_name = $2, updated_at = CURRENT_TIMESTAMP
            WHERE email = $3 OR oid = $4::UUID
            RETURNING oid, email, first_name, last_name, profile_image
        `;
        const params = [firstName, lastName, email, oid];

        const result = await db.query(sql, params);
        if (result.rows.length <= 0) {
            return null;
        }

        return result.rows[0];
    };

    static readonly updateUserProfileImage = async (
        profileImage: string,
        email: string | null = null,
        oid: string | null = null
    ) => {
        const sql = `
            UPDATE users SET profile_image = $1, updated_at = CURRENT_TIMESTAMP
            WHERE email = $2 OR oid = $3::UUID
            RETURNING oid, email, first_name, last_name, profile_image
        `;
        const params = [profileImage, email, oid];

        const result = await db.query(sql, params);
        if (result.rows.length <= 0) {
            return null;
        }

        return result.rows[0];
    };
}

export default UserRepo;
