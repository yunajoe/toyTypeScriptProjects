import { CountProduct, Product } from "./type.";

class Cart {
  itemsArr: Product[];
  countItemArr: CountProduct[];
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
    const findIndex = this.itemsArr.findIndex((value) => value.id == item.id);
    if (findIndex === -1) {
      const obj = {
        ...item,
        count: 1,
      };
      this.countItemArr = [...this.countItemArr, obj];
    } else {
      const findObj = this.countItemArr.find(
        (obj) => obj.id === item.id
      ) as CountProduct;

      findObj.count += 1;
    }

    this.itemsArr = [...this.itemsArr, item];
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

  cleartCart() {
    this.itemsArr = [];
    this.countItemArr = [];
    this.totalCountItems = 0;
    this.totalPrice = 0;
    this.totalSubPrice = 0;
    this.totalTax = 0;
    this.tax = 0.3;
  }
}
const cart = new Cart();

export default cart;
