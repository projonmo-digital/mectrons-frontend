import {
  SAVE_CARTS,
  UPDATE_CART,
  DELETE_CART,
  GET_PRODUCTS,
} from "~/helper/localStorage";
import type { ICartProduct, ICartItem } from "~/types/cart";
import type { IMethod } from "~/types/method";

interface IModifiedMethod extends IMethod {
  value: string
}

interface IState {
  loading: boolean;
  products: ICartProduct[];
  methods: IModifiedMethod[]
}

export const useCartStore = defineStore("cart", {
  state: () =>
    <IState>{
      loading: false,
      methods: [],
      products: []
    },
  actions: {
    async getPaymentMethods(params = {}) {
      const token = useCookie('token')
      let url = `${useRuntimeConfig().public.baseUrl}/payment-method?${new URLSearchParams(params).toString()}`;
      const response = await $fetch<IMethod[]>(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      })
      this.methods = response.map(m => ({...m, value: m.method }))
    },
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
