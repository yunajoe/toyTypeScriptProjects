import { Product } from "./type.";

class Cart {
  itemsArr: Product[];
  countItemArr: [];
  totalCountItems: number;
  totalPrice: number;
  totalSubPrice: number;
  totalTax: number;
  tax: number;
  constructor() {
    this.itemsArr = [];
    this.countItemArr = [];
    this.totalCountItems = 0;
    this.totalPrice = 0;
    this.totalSubPrice = 0;
    this.totalTax = 0;
    this.tax = 0.3;
  }

  // getter
  get getTotalItemCount() {
    return this.itemsArr.length;
  }

  addItemToCart(item: Product) {
    this.itemsArr = [...this.itemsArr, item];
    console.log("this.Arr", this.itemsArr);
    // this.countItemArr = this.countItemArr.reduce((newObject, item) => {
    //   if (this.itemsArr.length > 0) {
    //     const isItemExist = this.itemsArr.findIndex(
    //       (previousItem) => previousItem.id === item.id
    //     );
    //   }
    // }, {});
  }
  calculateItemPrice() {
    (this.totalSubPrice = this.itemsArr.reduce((subTotalPrice, item) => {
      subTotalPrice += item.price;
      return Number(subTotalPrice.toFixed(2));
    }, 0)),
      (this.totalTax = this.itemsArr.reduce((totalTax, item) => {
        const tax = item.price * this.tax;
        totalTax += tax;
        return Number(totalTax.toFixed(2));
      }, 0));

    this.totalPrice = Number((this.totalSubPrice + this.totalTax).toFixed(2));
  }
}
const cart = new Cart();

export default cart;
