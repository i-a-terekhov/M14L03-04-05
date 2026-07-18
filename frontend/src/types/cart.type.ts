import {FavoriteType} from "./favorite.type";

export type CartType = {
  items: CartItemType[];
}

export type CartItemType = {
  product: FavoriteType,
  quantity: number,
}
