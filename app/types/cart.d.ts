import type { IProduct } from "./products";

export interface ICartProduct extends IProduct {
  qty?: number;
}

export interface ICartItem {
  currency_id: number;
  seller_id: number;
  delivery_status: "placed";
  method: string;
  to_address: string;
  cost_fields: {
    coupon?: string;
    price: any;
    quantity: any;
    discount: number;
  };
  mega_id: number;
}
