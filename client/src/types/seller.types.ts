export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  buyerName: string;
  buyerGSTIN: string;
  status: 'pending_approval' | 'active' | 'traded' | 'expired' | 'rejected';
  description?: string;
  documentUrl?: string;
  createdAt: string;
  bids: Bid[];
  amountFinanced?: number;
  discountRate?: number;
  netAmount?: number;
  paymentTerms?: string;
}

export interface Bid {
  id: string;
  financierId: string;
  financierName: string;
  bidAmount: number;
  discountRate: number;
  validTill: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
  netAmount: number;
  charges: {
    platformFee: number;
    gst: number;
    otherCharges: number;
  };
}

export interface DashboardStats {
  totalInvoices: number;
  totalAmount: number;
  totalFinanced: number;
  averageDiscountRate: number;
  pendingApproval: number;
  activeInvoices: number;
  tradedInvoices: number;
  monthlyStats: {
    month: string;
    amount: number;
    rate: number;
  }[];
}