import {cookies} from './cookieStorage.js';

class Cart {
  constructor() {
    if(!cookies.has("cart")){
      cookies.set("cart", []);
    }
    this.cart = cookies.storage["cart"];
  }

  getItems(){
    return this.cart;
  }
  addItem(productId, quantity = 1) {
    this.cart = cookies.get("cart");
    this.cart.push({id: productId, quantity: quantity});
    cookies.set("cart", this.cart);
  }
  removeItem(productId) {
    this.cart = cookies.storage["cart"]
    this.cart = this.cart.filter(item => item.id !== productId);
    cookies.set("cart", this.cart);
  }
}

export const cart = new Cart();
