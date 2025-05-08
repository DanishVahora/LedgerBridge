export interface Transaction {
  id: number;
  invoiceId: number;
  bidAmount: number;
  discountRate: number;
  creditedTo: string;
  transactionTime: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
}

export interface TransactionGroupedResponse {
  pending: Transaction[];
  success: Transaction[];
}