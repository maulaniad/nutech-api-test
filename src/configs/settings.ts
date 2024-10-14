import dotenv from "dotenv";


dotenv.config();

export default {
    // Database Settings
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_user: process.env.DB_USER,
    db_pass: process.env.DB_PASS,
    db_name: process.env.DB_NAME,

    // Auth Settings
    jwt_secret: process.env.SECRET_KEY!,
    jwt_expire: "2h",

    // App Settings
    app_port: process.env.APP_PORT ?? 3000,
    console_format: "[server]  :method :url Params: :req[body] :response-time ms"
};
