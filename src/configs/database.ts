import { Pool } from "pg";

import settings from "@configs/settings";


const host = settings.db_host ?? "localhost";
const port = settings.db_port ?? 5432;
const user = settings.db_user ?? "postgres";
const password = settings.db_pass ?? "";
const database = settings.db_name ?? "nutech";

const pool = new Pool({
    host: host,
    port: port as number,
    user: user,
    password: password,
    database: database,
});

export default pool;
