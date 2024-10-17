import db from "@configs/database";


class WalletRepo {
    static readonly getWalletByUser = async (idUser: number) => {
        const sql = `
            SELECT oid, wallet_name, balance FROM wallets
            WHERE id_user = $1 ORDER BY created_at DESC
        `;
        const params = [idUser];

        const result = await db.query(sql, params);
        if (result.rows.length <= 0) {
            return null;
        }

        return result.rows;
    }

    static readonly getWalletByOID = async (oid: string) => {
        const sql = `
            SELECT oid, wallet_name, balance FROM wallets
            WHERE oid = $1 ORDER BY created_at DESC
        `;
        const params = [oid];

        const result = await db.query(sql, params);
        if (result.rows.length <= 0) {
            return null;
        }

        return result.rows[0];
    }

    static readonly createWallet = async (idUser: number, walletName: string) => {
        const sql = "INSERT INTO wallets (id_user, wallet_name) VALUES ($1, $2)";
        const params = [idUser, walletName];

        const result = await db.query(sql, params);
        if (result.rows.length <= 0) {
            return null;
        }

        return result;
    }

    static readonly updateWalletBalance = async (oid: string, balance: number) => {
        const sql = "UPDATE wallets SET balance = $1 WHERE oid = $2::UUID RETURNING balance";
        const params = [balance, oid];

        const result = await db.query(sql, params);
        if (result.rows.length <= 0) {
            return null;
        }

        return result.rows[0];
    }
}

export default WalletRepo;
