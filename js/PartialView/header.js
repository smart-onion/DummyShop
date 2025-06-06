import {pageBuilder} from "../Utilities/PageBuilder.js";
import {searchProducts} from "../Utilities/dummyjson.js";
import {favorites} from "../Utilities/favorites.js";
import {router} from "../Utilities/router.js";
import {showCartView} from "./cartView.js";
import {cart} from "../Utilities/cart.js";

function getFavBtn(){
  let favBtn = document.createElement("button");
  favBtn.setAttribute("class", "header-favorites");
  let pathFav = window.location.pathname + `?favorites=`
  router.addRoute(pathFav, async () =>{
    let products = await favorites();
    await pageBuilder.renderContent(products);
  })
  favBtn.addEventListener("click", async () =>{
    router.navigate(pathFav)
  });
  return favBtn;
}

function getCartBtn(){
  let cartBtn = document.createElement("button");
  cartBtn.setAttribute("class", "header-cart");
  cartBtn.textContent = `Cart: ${cart.getItems().length}`;
  cartBtn.addEventListener("click", async () =>{
   await showCartView();
  });
  return cartBtn;
}

function getSearchBtn(input){
  let button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.setAttribute("name", "search");
  button.setAttribute("id", "search");
  button.textContent = `FIND`;
  let pathSearch = window.location.pathname + `?search=`
  router.addRoute(pathSearch, async () =>{
    let params = new URLSearchParams(window.location.search);
    params.set("search", input.value);
    let products = await searchProducts(input.value);
    await pageBuilder.renderContent(products.products, 1);
  })

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    router.navigate(pathSearch)
  });

  return button;
}

export function header(){

  let header = document.createElement("div");
  header.classList.add("header");

  let logo = document.createElement("button");
  logo.setAttribute("class", "header-logo");
  logo.textContent = "DUMMYSHOP";

  logo.addEventListener("click", async () =>{
    console.log(window.location.pathname);
    await router.navigate(window.location.pathname)
  })

  let div = document.createElement("div");
  div.setAttribute("class", "header-search");

  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Search...");
  input.setAttribute("name", "searchInput");
  input.setAttribute("id", "searchInput");

  let searchBtn = getSearchBtn(input);
  let cartBtn = getCartBtn();
  let favBtn = getFavBtn();


  div.appendChild(input);
  div.appendChild(searchBtn);
  div.appendChild(favBtn);
  div.appendChild(cartBtn);

  header.appendChild(logo);
  header.appendChild(div);

  return header;
}
