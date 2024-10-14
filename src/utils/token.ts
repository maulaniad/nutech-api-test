import jwt from "jsonwebtoken";

import settings from "@configs/settings";


const generateToken = (data: any) => {
    return jwt.sign(data, settings.jwt_secret, { expiresIn: settings.jwt_expire });
}

const verifyToken = (token: string) => {
    let validToken: any = null;

    jwt.verify(token, settings.jwt_secret, (err, decoded) => {
        if (err) validToken = null;
        validToken = decoded;
    });

    return validToken;
}

export { generateToken, verifyToken };
