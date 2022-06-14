import {Tag} from "./tag";

export interface Product {
  code?: number,
  name: string,
  expirationDate: number,
  tags: Tag[]
}
