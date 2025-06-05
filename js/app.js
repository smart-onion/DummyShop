import { pageBuilder } from "./Utilities/PageBuilder.js";
import {router} from "./Utilities/router.js";
await pageBuilder.buildPage()

router.addRoute(window.location.pathname, async () => {
  let content = document.getElementById("content");
  content.innerText = "DUMMYSHOP";
})

let path = window.location.pathname;

let params = new URLSearchParams(window.location.search);
let product = params.get("product");
if(product !== null) {
  pageBuilder.renderProductPage(product);
}else{
  router.navigate(path + window.location.search);
}
