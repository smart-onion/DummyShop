import { pageBuilder } from "./Utilities/PageBuilder.js";
import {router} from "./Utilities/router.js";
await pageBuilder.buildPage()


let path = window.location.pathname;

let params = new URLSearchParams(window.location.search);
let category = params.get("category");
let product = params.get("product");
if(category !== null){
  path+= "?category=" + category;
  router().navigate(path);
}else if(product !== null){
  pageBuilder.renderProductPage(product);
}

