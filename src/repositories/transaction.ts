import db from "@configs/database";


interface Transaction {
    idService: number,
    idUser: number,
    invoiceNumber: string,
    transactionType: string,
    totalAmount: string
}

class TransactionRepo {
    static readonly getAllTransactions = async (limit: number | null, offset: number | null) => {
        let sql = `
            SELECT oid, invoice_number, transaction_type, description, total_amount, created_at FROM transactions
            ORDER BY created_at DESC
        `;
        if (limit) {
            sql += ` LIMIT ${limit}`;

            if (offset) {
                sql += ` OFFSET ${offset}`;
            }
        }

        const result = await db.query(sql);
        return result.rows;
    }

    static readonly createTransaction = async (data: Transaction) => {
        const sql = `
            INSERT INTO transactions (
                id_service, id_user, invoice_number, transaction_type, total_amount
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING oid, invoice_number, transaction_type, total_amount
        `;
        const params = [
            data.idService,
            data.idUser,
            data.invoiceNumber,
            data.transactionType,
            data.totalAmount
        ];

        const result = await db.query(sql, params);
        return result.rows[0];
    }
}

export default TransactionRepo;
