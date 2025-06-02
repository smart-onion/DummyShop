export class Category{
  constructor({slug, name, url}){
    this.slug = slug;
    this.name = name;
    this.url = url;
  }
}

export function getCategoryList(categories){
  let list = [];
  categories.forEach(category => {
    list.push(category);
  })
  return list;
}
