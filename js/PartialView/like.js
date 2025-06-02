if(localStorage.getItem('favorites') === null){
  localStorage.setItem("favorites", JSON.stringify([]));
}


export function getLike(productId){
  let like = document.createElement("img");
  like.classList.add("card-like");
  like.addEventListener("click", (e) =>{
    e.preventDefault();
    e.stopPropagation();
    let favorites = localStorage.getItem("favorites");
    if(favorites === null){
      favorites = [];
    } else{
      favorites = JSON.parse(favorites);
      if(favorites.includes(productId)){
        favorites = favorites.filter(item => item !== productId);
        like.src = "../../img/white-like.png";
      } else{
        like.src = "../../img/full-like.png";
        favorites.push(productId);
      }
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });

  like.src = JSON.parse(localStorage.getItem("favorites")).includes(productId) ?
    "../../img/full-like.png" :
    "../../img/white-like.png";
  return like;
}


