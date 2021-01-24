class UI {
  
  constructor() {
    this.productContainer = document.getElementById("product-container");
    this.count = document.getElementById("count");
  }

  createItem(card) {
    let item = document.createElement("div");
    item.setAttribute("class", "item");

    let itemImg = document.createElement("div");
    itemImg.style.backgroundImage = `url(${card.img})`;
    itemImg.setAttribute("class", "item-img");

    let productName = document.createElement("h6");
    productName.innerText = card.name;

    let productPrice = document.createElement("h5");
    productPrice.innerText = card.price + " ₺";

    let itemButton = document.createElement("button");
    itemButton.innerText = "ADD TO CART";

    item.appendChild(itemImg);
    item.appendChild(productName);
    item.appendChild(productPrice);
    item.appendChild(itemButton);

    this.productContainer.appendChild(item);

    itemButton.addEventListener("click", () => {
      console.log(card.name);
      Storage.addStorage(card);
      this.showCartCount();
    });

    return this.productContainer;
  }

  clearItemFromProductContainer() {
    this.productContainer.innerHTML = "";
  }

  showCartDetail(item, index) {
    let container = document.getElementById("cart-container");

    let cart = document.createElement("div");
    cart.setAttribute("class", "cart");

    let id = document.createElement("p");
    id.innerHTML = index + 1;

    let name = document.createElement("p");
    name.innerHTML = item.name;
    name.setAttribute("class", "cart-name");

    let price = document.createElement("p");
    price.innerHTML = item.price + " ₺";

    let quantityArea = document.createElement("div");
    quantityArea.setAttribute("class", "quantityArea");
    let arttir = document.createElement("button");
    arttir.innerHTML = "+";
    let azalt = document.createElement("button");
    azalt.innerHTML = "-";

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class","deletebutton")
    deleteButton.innerHTML="X";

    let quantity = document.createElement("p");
    quantity.innerHTML = item.quantity;
    quantityArea.appendChild(arttir);
    quantityArea.appendChild(quantity);
    quantityArea.appendChild(azalt);
    let total = document.createElement("p");
    total.innerText = (item.price * item.quantity).toFixed(2) + " ₺";

    cart.appendChild(id);
    cart.appendChild(name);
    cart.appendChild(price);
    cart.appendChild(quantityArea);
    cart.appendChild(total);
    cart.appendChild(deleteButton)

    container.appendChild(cart);

    arttir.addEventListener("click", () => {
      Storage.updateStorage(item, "arttir");
      quantity.innerHTML = Number(quantity.innerHTML) + 1;
      total.innerHTML = (quantity.innerHTML * item.price).toFixed(2)+ " ₺";
      this.showCartFooter();
    });

    azalt.addEventListener("click", () => {
      Storage.updateStorage(item, "azalt");
      quantity.innerHTML = Number(quantity.innerHTML) - 1;
      if (quantity.innerHTML < 1) {
        quantity.innerHTML = 1;
      }

      total.innerHTML = (quantity.innerHTML * item.price).toFixed(2)+ " ₺";
      this.showCartFooter();
    });

    deleteButton.addEventListener("click",()=>{
      Storage.deleteStorage(item.id)
      container.removeChild(cart)
      this.showCartFooter();  
    })

  }

  showCartFooter() {
    const data = Storage.getStor();
    let totalCart = 0;
    data.map((m) => {
      totalCart += m.quantity * m.price;
    });

    let cartContainer = document.getElementById("container");

    let footer = document.createElement("div");
    footer.setAttribute("class", "footer");

    let countCarts = document.createElement("p");
    countCarts.innerHTML =
      "Sepetinizde toplam " + data.length + " ürün bulunmaktadır.";
    countCarts.setAttribute("class", "count");

    let totalCards = document.createElement("p");
    totalCards.innerHTML =
      "Sepetinizin toplam tutarı: <strong>" +
      totalCart.toFixed(2) + " ₺"+
      "</strong>";
    totalCards.setAttribute("class", "total");

    cartContainer.removeChild(cartContainer.childNodes[2]);

    footer.appendChild(countCarts);
    footer.appendChild(totalCards);

    cartContainer.appendChild(footer);
  }

  showCartCount() {
    this.count.innerHTML = Storage.getStor().length;
  }
}
