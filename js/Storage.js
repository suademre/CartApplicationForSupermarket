class Storage {
  
  static getStor() {
    let tampon;
    if (localStorage.getItem("cart") !== null) {
      tampon = JSON.parse(localStorage.getItem("cart"));
    } else {
      tampon = [];
    }
    return tampon;
  }

  static addStorage(item) {
    let tampon = this.getStor();

    let current = tampon.find((f) => {
      return f.id === item.id;
    });

    if (current) {
      current.quantity++;
    } else {
      tampon.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(tampon));
  }

  static updateStorage(item, islem) {
    const data = this.getStor();

    if (islem === "arttir") {
      data.find((f) => {
        if (f.id === item.id) {
          f.quantity++;
        }
      });
    } else {
      data.find((f) => {
        if (f.id === item.id) {
          f.quantity = f.quantity <= 1 ? 1 : f.quantity - 1;
        }
      });
    }

    localStorage.setItem("cart", JSON.stringify(data));
  }

  static deleteStorage(item) {
    const data = this.getStor();
    const tampon = data.filter((f) => f.id !== item);
    localStorage.setItem("cart", JSON.stringify(tampon));

  }
}
