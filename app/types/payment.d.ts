export interface IWallet {
  id: number;
  user_id: number;
  amount: number;
  created_at: string;
  updated_at: string;
}

export interface IPaymentHistory {
  id: number;
  user_id: number;
  invoice_id: number;
  withdraw_date: null | string;
  withdraw_amount: null | number;
  add_date: null | string;
  add_amount: null | number;
  status: "paid" | "due" | "in-wallet";
  created_at: string;
  updated_at: string;
}
