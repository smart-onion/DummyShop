import {cookies} from './cookieStorage.js';

class Cart {

  static #instance = null;

  static getInstance() {
    if (!Cart.#instance) {
      Cart.#instance = new Cart();
    }
    return Cart.#instance;
  }

  constructor() {
    if(Cart.#instance){
      throw new Error('Use Cart.getInstance() to get the singleton instance.');
    }
    if(!cookies.has("cart")){
      cookies.set("cart", []);
    }
    this.cart = cookies.get("cart");
  }

  getItems(){
    return this.cart;
  }
  addItem(productId, quantity = 1) {
    this.cart = cookies.get("cart");
    let exist = false;
    for(let i=0; i<this.cart.length; i++){
      if(productId === this.cart[i].id){
        exist = true;
        this.cart[i].quantity++;
      }
    }
    if(!exist){
      this.cart.push({id: productId, quantity: quantity});
    }
    cookies.set("cart", this.cart);
  }
  removeItem(productId) {
    console.log(productId);
    this.cart = this.cart.filter(item => item.id !== productId);
    cookies.set("cart", this.cart);
  }
  removeOne(productId) {
    console.log(this.cart, productId);
    let id =  parseInt(productId);
    for (let i = 0; i < this.cart.length;i++) {
      if(this.cart[i].id === id) {
        this.cart[i].quantity--;
        if(this.cart[i].quantity === 0) {
          this.removeItem(id);
        }
      }
    }
    console.log(this.cart)
    cookies.set("cart", this.cart);
  }

  removeAll(productId) {
    this.cart = [];
    cookies.set("cart", this.cart);
  }
}

export const cart = Cart.getInstance();
