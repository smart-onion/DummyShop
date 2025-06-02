class RenderEngine {
  constructor(data, path) {
    this.data = data;
    this.path = path;
  }

  async #loadView(path){
    try{
      let result = await fetch(path);
      return await result.text();
    }catch(error){
      console.error(error.message);
    }
  }
  async render(){
    
  }
}
