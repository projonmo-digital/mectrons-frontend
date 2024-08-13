import { SAVE_CARTS, UPDATE_CART, DELETE_CART, GET_PRODUCTS } from "~/helper/localStorage"
import type { ICartProduct, ICartItem } from "~/types/cart"

interface IState {
    loading: boolean,
    invoices: ICartItem[],
    products: ICartProduct[],
    fromData: any
}

export const useCartStore = defineStore("cart", {
  state: () => <IState>({
    loading: false,
    invoices: [],
    products: [],
    fromData: {
      coupon: '',
      price: {},
      quantity: {},
      discount: 0
    }
  }),
  actions: {
    getLocalProducts() {
      return GET_PRODUCTS().then((res) => {
        this.products = res
      }).then(() => {
        this.fromDateGenerator()
      })
    },
    addToCart(product: ICartProduct, qty = 1) {
      let p = this.products.find(p => p.id === product.id)
      if(p){
        this.increment(p)
      }else{
        product.qty = qty
        this.products.push(product)
      }
      SAVE_CARTS(this.products)
      this.fromDateGenerator()
    },
    removeFromCart(product: ICartProduct) {
      this.products = this.products.filter(p => p.id !== product.id)
      setTimeout(() => {
        SAVE_CARTS(this.products)
      })
      this.fromDateGenerator()
    },
    increment(product: ICartProduct){
      let p = this.products.find(p => p.id === product.id)
      if(p?.qty){
        p.qty++
      }
      setTimeout(() => {
        SAVE_CARTS(this.products)
      })
      this.fromDateGenerator()
    },
    decrement(product: ICartProduct){
      let p = this.products.find(p => p.id === product.id)
      if(p?.qty){
        if(p.qty > 1){
          p.qty--
        }
      }
      setTimeout(() => {
        SAVE_CARTS(this.products)
      })
      this.fromDateGenerator()
    },
    fromDateGenerator() {
      let fromData: any = {
        coupon: '',
        price: {},
        quantity: {},
        discount: 0
      }
      for (const product of this.products) {        
        fromData.price[product.id] = product.price * (product.qty || 1)
        fromData.quantity[product.id] = product.qty || 1
      }
      this.fromData = fromData
    }
  }
});