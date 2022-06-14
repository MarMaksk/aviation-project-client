import {Product} from "./product";

export interface Order {
  icaoCode: string,
  iataCode: string,
  lastDate: Date,
  deliveryTime: Date,
  productOrderId: number
  status?: string
  products?: Product[]
  deliveredProducts?: Product[]
}
