import {getProductById, getProductsByCategory, searchProducts} from "./dummyjson.js";
import {Card} from "../Model/card.js";
import {Product} from "../Model/product.js";
import {router} from "./router.js";
import {header} from "../PartialView/header.js";
import {navigation} from "../PartialView/navigation.js";
import {renderEngine} from "./renderEngine.js";
import {getLike} from "../PartialView/like.js";
import {cart} from "./cart.js";

export class PageBuilder {
  static partialViewPath = "js/PartialView/";
  static limit = 10;
  static page = 1;

  static #instance = null;

  static getInstance() {
    if (!PageBuilder.#instance) {
      PageBuilder.#instance = new PageBuilder();
    }
    return PageBuilder.#instance;
  }

  constructor() {
    if (PageBuilder.#instance) {
      throw new Error('Use PageBuilder.getInstance() to get the singleton instance.');
    }
  }

  async #loadView(path){
    try{
      let result = await fetch(PageBuilder.partialViewPath + path);
      return await result.text();
    }catch(error){
      console.error(error.message);
    }
  }

  async renderContent(products, page = 1){
    let content = document.getElementById("content");
    content.classList.add("content");
    let prodList = [];
    products.forEach(product => {
      prodList.push(new Product(product));
    })
    content.innerHTML = "";
    prodList.slice(page*PageBuilder.limit - PageBuilder.limit, page*PageBuilder.limit).forEach(product => {
      let path = window.location.pathname + `?product=${product.id}`
      console.log(path);

      const render = async () => {
        await this.renderProductPage(product.id);
      }
      router.addRoute(path, render.bind(this)); // Bind to PageBuilder instance
      let card = new Card({
        id: product.id,
        name: product.title,
        description: product.description,
        image: product.images,
        category: product.category,
        price: product.price,
      });

        let c = card.createCard();
        c.addEventListener("click", async () =>{
           await router.navigate(path);
        })
        content.appendChild(c);
    })
  }

  async renderProductPage(productId){

    let productJson = await getProductById(productId);
    let product = new Product(productJson);
    let html = await this.#loadView("product.html");
    //html = html.replace("%image%", product.images[0]);

    html = await renderEngine.render(html, productJson);
    let like = await getLike(productId);
    let content = document.getElementById("content");
    content.classList.remove("content");
    content.innerHTML = html;
    content.prepend(like);
    let cartElem = content.querySelector(".card-cart");
    cartElem.addEventListener("click", (e) =>{
      e.stopPropagation();
      cart.addItem(productId);
      console.log(cart.getItems());
      let headerCard = document.querySelector(".header-cart");
      headerCard.textContent = `Cart: ${cart.getItems().length}`;
    })
  }

  async buildPage(){
    let content = document.createElement("div");
    let head = header();
    let nav = await navigation(this.renderContent.bind(this));

    content.setAttribute("class", "content");
    content.setAttribute("id", "content");

    //let pag = this.buildPagination()

    let container = document.createElement("div");
    container.classList.add("container");


    container.appendChild(head);
    container.appendChild(nav);
    container.appendChild(content);
    document.body.appendChild(container);


  }
}

export const pageBuilder = PageBuilder.getInstance();
