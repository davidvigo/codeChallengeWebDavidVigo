export interface TransactionDto {
    id: number;
    date: Date;
    amount: number;
    fee: number;
    description: string;
    userId: number;
}
