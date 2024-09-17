import type { IProduct } from "./products";

export type TOrderStatus = "placed" | "received" | "confirmed" | "rejected" | "on the way" | "delivered"

export interface ICartProduct extends IProduct {
  qty?: number;
}

export interface IInvoice {
  id: number
  mega_id: string
  delivery_status: TOrderStatus
}

export interface ICartItem {
  currency_id: number;
  seller_id: number;
  delivery_status: "placed";
  method: string;
  to_address: string;
  billing_information: {
    email: string
    number: string
  }
  cost_fields: {
    price: any;
    quantity: any;
  };
  coupon?: string;
  mega_id: string;
}
