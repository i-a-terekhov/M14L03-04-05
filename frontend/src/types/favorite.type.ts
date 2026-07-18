export type FavoriteType = {
  id: string;
  name: string;
  url: string;
  image: string;
  price: number;
}

export type FavoriteWithCartCountType = FavoriteType & {
  countInCart: number;
}
