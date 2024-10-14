import dotenv from "dotenv";
import { Pool } from "pg";


dotenv.config();

const host = process.env.DB_HOST ?? "localhost";
const port = process.env.DB_PORT ?? 5432;
const user = process.env.DB_USER ?? "postgres";
const password = process.env.DB_PASS ?? "";
const database = process.env.DB_NAME ?? "nutech";

const pool = new Pool({
    host: host,
    port: port as number,
    user: user,
    password: password,
    database: database,
});

export default pool;
