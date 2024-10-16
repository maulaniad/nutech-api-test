import db from "@configs/database";


class WalletRepo {
    static readonly getWalletByUser = async (idUser: number) => {
        const sql = "SELECT * FROM wallets WHERE id_user = $1";
        const params = [idUser];

        const result = await db.query(sql, params);
        return result.rows;
    }

    static readonly getWalletByOID = async (oid: string) => {
        const sql = "SELECT * FROM wallets WHERE oid = $1";
        const params = [oid];

        const result = await db.query(sql, params);
        return result.rows[0];
    }

    static readonly createWallet = async (idUser: number, walletName: string) => {
        const sql = "INSERT INTO wallets (id_user, wallet_name) VALUES ($1, $2)";
        const params = [idUser, walletName];

        const result = await db.query(sql, params);
        return result;
    }
}

export default WalletRepo;
