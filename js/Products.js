class Product{
      constructor(){
            this.url = "http://localhost:3000/products";
      }
      async getProduct(search){

      const data = await fetch(this.url+"?q="+search+"&_limit=20");
      const responsive = await data.json();

      return responsive
      }
}