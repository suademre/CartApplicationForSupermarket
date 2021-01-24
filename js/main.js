const ui = new UI()
const product = new Product();
const searchBar = document.getElementById("search")

window.onload=()=>{
      showData();
      ui.showCartCount();
     
}

searchBar.addEventListener("keypress",(e)=>{
      console.log(e.target.value)
     showData();
      
});

showData=()=>{
      ui.clearItemFromProductContainer()
      product.getProduct(searchBar.value).then(data=>{
            data.map(m=>{
                  ui.createItem(m)
            })

      })
}





