export const productsUrl = 'https://dummyjson.com/products';

export async function getAllCategories(){
  try{
    let result = await fetch(productsUrl + "/categories");
    return await result.json();
  }catch(error){console.log(error)}

}

export async function getProductsByCategory(path){
  try{
    let result = await fetch(path);
    return await result.json();
  }catch(error){console.log(error)}
}

export async function getProductById(id){
  try{
    let result = await fetch(productsUrl + "/" + id);
    return await result.json();
  }catch(error){console.log(error)}
}

export async function searchProducts(search){
  try{
    let result = await fetch(productsUrl + "/search?q=" + search);
    return await result.json();
  }catch(error){console.log(error)}
}
