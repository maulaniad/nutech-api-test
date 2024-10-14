import crypto from "crypto";


const scrypt = (password: string, salt: string, keylen: number): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, keylen, (err, derivedKey) => {
            if (err) {
                reject(err);
            }

            resolve(derivedKey);
        });
    });
};

const makePassword = async (password: string) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const keyLength = 64;
    const hashedPassword = await scrypt(password, salt, keyLength);
    return `${salt}:${hashedPassword.toString("hex")}`;
};

const checkPassword = async (password: string, hashedPassword: string) => {
    const [salt, key] = hashedPassword.split(":");
    const keyLength = 64;
    const derivedKey = await scrypt(password, salt, keyLength);

    return derivedKey.toString("hex") === key;
};

export { makePassword, checkPassword };
