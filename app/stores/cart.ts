import {
  SAVE_CARTS,
  UPDATE_CART,
  DELETE_CART,
  GET_PRODUCTS,
} from "~/helper/localStorage";
import type { ICartProduct, ICartItem } from "~/types/cart";

// const { user } = storeToRefs(useAuthStore());

interface IState {
  loading: boolean;
  products: ICartProduct[];
}

export const useCartStore = defineStore("cart", {
  state: () =>
    <IState>{
      loading: false,
      products: [],
    },
  actions: {
    getLocalProducts() {
      return GET_PRODUCTS()
        .then((res) => {
          this.products = res;
        })
        .then(() => {});
    },
    addToCart(product: ICartProduct, qty = 1) {
      let p = this.products.find((p) => p.id === product.id);
      if (p) {
        this.increment(p);
      } else {
        product.qty = qty;
        this.products.push(product);
      }
      SAVE_CARTS(this.products);
    },
    removeFromCart(product: ICartProduct) {
      this.products = this.products.filter((p) => p.id !== product.id);
      setTimeout(() => {
        SAVE_CARTS(this.products);
      });
    },
    increment(product: ICartProduct) {
      let p = this.products.find((p) => p.id === product.id);
      if (p?.qty) {
        p.qty++;
      }
      setTimeout(() => {
        SAVE_CARTS(this.products);
      });
    },
    decrement(product: ICartProduct) {
      let p = this.products.find((p) => p.id === product.id);
      if (p?.qty) {
        if (p.qty > 1) {
          p.qty--;
        }
      }
      setTimeout(() => {
        SAVE_CARTS(this.products);
      });
    },
  },
});
