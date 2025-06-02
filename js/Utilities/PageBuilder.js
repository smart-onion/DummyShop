import {getAllCategories, getProductById, getProductsByCategory, searchProducts} from "./dummyjson.js";
import {getCategoryList} from "../Model/category.js";
import {Card} from "../Model/card.js";
import {Product} from "../Model/product.js";
import {router} from "./router.js";

class PageBuilder {
  static partialViewPath = "js/PartialView/";
  static limit = 10;
  static page = 1;
  constructor() {
  }

  async #loadView(path){
    try{
      let result = await fetch(PageBuilder.partialViewPath + path);
      return await result.text();
    }catch(error){
      console.error(error.message);
    }
  }

  addEvents(){
    let button = document.getElementById("search");
    let input = document.getElementById("searchInput");
    button.addEventListener("click", (e) => {
      e.preventDefault();
      let params = new URLSearchParams(window.location.search);
      params.set("search", input.value);
      this.renderContent(null, PageBuilder.page, input.value);
    })
  }

  async buildHeader(){

    let headerText = await this.#loadView("header.html");
    let header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = headerText;
    return header;
  }

  async buildNavigation(){
    let nav = document.createElement("div");
    let ul = document.createElement("ul");
    let categories = await getAllCategories();
    let catList = getCategoryList(categories);

    nav.classList.add("nav");

    catList.forEach(cat => {
      let path =   window.location.pathname + `?category=${cat.slug}`
      router().addRoute(path, async () =>{
        await this.renderContent(cat.url, PageBuilder.page);
      });
      let li = document.createElement("li");
      li.textContent = cat.name;
      li.onclick = async () =>{
        PageBuilder.page = 1;
        await router().navigate(path, {slug: cat.slug});
      }
      ul.appendChild(li);
    });
    nav.appendChild(ul);
    return nav;
  }

  async renderContent(path, page, search = null){
    let content = document.getElementById("content");
    let products;
    if(search === null){
      console.log(path);
      products = await getProductsByCategory(path);
    }else{
      products = await searchProducts(search);
    }

    if(products.products.length <= 0){
      content.innerHTML = "<h1>Opps! no products found</h1>";
      return;
    }

    let prodList = [];
    products.products.forEach(product => {
      prodList.push(new Product(product));
    })

    content.innerHTML = "";
    prodList.slice(page*PageBuilder.limit - PageBuilder.limit, page*PageBuilder.limit).forEach(product => {
      let path = `?product=${product.id}`
      router().addRoute(path, async () =>{
        await this.renderProductPage(product.id);
      })
      let card = new Card({
        id: product.id,
        name: product.title,
        description: product.description,
        image: product.images,
        category: product.category,
        price: product.price,
      });

      new Promise(() => {
        let c = card.createCard();
        c.addEventListener("click",async () =>{
          await router().navigate(path);
        })
        content.appendChild(c);
      })
    })
  }

  async renderProductPage(productId){

    let productJson = await getProductById(productId);
    let product = new Product(productJson);
    let html = await this.#loadView("product.html");
    html = html.replace("%image%", product.images[0]);
    let content = document.getElementById("content");
    content.innerHTML = html;
  }

  buildPagination(){
    let pag = document.createElement("div");
    let next = document.createElement("button");
    let prev = document.createElement("button");

    pag.classList.add("pagination");
    next.classList.add("button-next");
    prev.classList.add("button-prev");
    next.textContent = "Next";
    prev.textContent = "Previous";

    let params = new URLSearchParams(window.location.search);
    let path = window.location.pathname + "?category=" + params.get("category");

    next.addEventListener("click",()=>{
      PageBuilder.page++;
      router().navigate(path);
    })
    prev.addEventListener("click",()=>{
      PageBuilder.page--;
      router().navigate(path);
    })

    pag.appendChild(prev);
    pag.appendChild(next);
    return pag;
  }

  async buildPage(){
    let nav = await this.buildNavigation();
    let header = await this.buildHeader();
    let content = document.createElement("div");

    content.setAttribute("class", "content");
    content.setAttribute("id", "content");

    let pag = this.buildPagination()

    let container = document.createElement("div");
    container.classList.add("container");


    container.appendChild(header);
    container.appendChild(nav);
    container.appendChild(content);
    //container.appendChild(pag);
    document.body.appendChild(container);

    this.addEvents()
  }
}

export const pageBuilder = new PageBuilder();
