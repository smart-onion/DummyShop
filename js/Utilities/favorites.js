import {getProductById} from "./dummyjson.js";

export async function favorites(){
  let fav = JSON.parse(localStorage.getItem("favorites"));
  if(!fav){
    let content = document.getElementById("content");
    content.innerHTML = "<h1>You don't like any staff yet :((</h1>";
    return;
  }
  let products = [];

  for (const productId of fav) {
    let product = await getProductById(productId);
    products.push(product);
  }

  console.log(products);
  return products;
}
