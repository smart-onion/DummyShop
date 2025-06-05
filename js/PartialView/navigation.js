import {getAllCategories, getProductsByCategory} from "../Utilities/dummyjson.js";
import {getCategoryList} from "../Model/category.js";
import {router} from "../Utilities/router.js";
import {PageBuilder, pageBuilder} from "../Utilities/PageBuilder.js";

export async function navigation(render){
  let nav = document.createElement("div");
  let ul = document.createElement("ul");
  let categories = await getAllCategories();
  let catList = getCategoryList(categories);

  nav.classList.add("nav");

  catList.forEach(cat => {
    let path =   window.location.pathname + `?category=${cat.slug}`
    router.addRoute(path, async () =>{
      let products = await getProductsByCategory(cat.url);
      await render(products.products, PageBuilder.page);
    });
    let li = document.createElement("li");
    li.textContent = cat.name;
    li.addEventListener("click", async () =>{
      console.log("clicked");
      PageBuilder.page = 1;
      await router.navigate(path, {slug: cat.slug});
    });
    ul.appendChild(li);
  });
  nav.appendChild(ul);
  return nav;
}
