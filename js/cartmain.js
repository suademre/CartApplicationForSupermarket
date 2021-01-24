const ui = new UI();
let total =0;
window.onload=()=>{
const data= Storage.getStor()
data.map((m,index)=>{
      ui.showCartDetail(m,index);
      total += m.price * m.quantity;
})

ui.showCartFooter()

}