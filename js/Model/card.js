export class Card{
  constructor({id, name, image, category, description, price}){
    this.id = id;
    this.name = name;
    this.images = image;
    this.category = category;
    this.description = description;
    this.price = price;
  }
  createCard(){
    let div = document.createElement("div");
    let img = document.createElement("img");
    let title = document.createElement("h1");
    let description = document.createElement("p");
    let price = document.createElement("p");
    let category = document.createElement("p");
    let id = document.createElement("input");

    div.classList.add("card");

    img.classList.add("card-img");
    title.classList.add("card-title");
    description.classList.add("card-description");
    price.classList.add("card-price");
    category.classList.add("card-category");

    div.addEventListener("mouseover", () =>{
      description.textContent = this.description;

    })
    div.addEventListener("mouseout", () =>{
      description.textContent = this.description.substring(0, 50) + "...";
    })
    id.setAttribute("type", "hidden");
    id.value = this.id;
    img.src = this.images[0];
    title.textContent = this.name;
    description.textContent = this.description.substring(0, 50) + "...";
    price.textContent = this.price + "$";
    category.textContent = "Category: " + this.category;

    div.appendChild(id);
    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(category);
    div.appendChild(price);
    div.appendChild(description);

    return div;
  }
}
