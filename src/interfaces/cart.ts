import { productI } from "./product";

export interface CartResponse {
  status?: string;
  numOfCartItems: number;
  cartId: string;
  data: Data;
  message?:string,
}

export interface Data {
  _id: string;
  cartOwner: string;
  products: Item[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface Item {
  count: number;
  _id: string;
  product: productI;
  price: number;
}
export type CartItem = {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    brand: { name: string };
    category: { name: string };
  };
};

export type Order = {
  _id: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  createdAt: string;
  cartItems: CartItem[];
};

