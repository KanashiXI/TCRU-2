import { Product } from "./product";



export class CartItem {
  id: number;
  productId: number;
  productName: string;
  qty: number;
  price: number;

  constructor(id: number, product: Product, qty = 1) {
    this.id = id;
    this.productId = product.product_id;
    this.productName = product.product_name;
    this.price = product.retail_price;
    this.qty = qty;
  }
}
