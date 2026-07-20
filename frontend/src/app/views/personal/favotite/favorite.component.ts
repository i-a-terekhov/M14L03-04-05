import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FavoriteService } from '../../../shared/services/favorite.service';
import { FavoriteType, FavoriteWithCartCountType } from '../../../../types/favorite.type';
import { DefaultResponseType } from '../../../../types/default-response.type';
import { environment } from '../../../../environments/environment';
import { CartItemType, CartType } from '../../../../types/cart.type';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  productsInFavorite: FavoriteType[] = [];

  productsInCart: CartItemType[] | null = null;

  favoriteProductsWithCartCount: FavoriteWithCartCountType[] = [];

  serverStaticPath = environment.serverStaticPath;

  constructor(private favoriteService: FavoriteService, private cartService: CartService) {
  }

  ngOnInit(): void {
    forkJoin({
      favorites: this.favoriteService.getFavorites(),
      cart: this.cartService.getCart(),
    })
      .subscribe(({ favorites, cart }) => {
        if ((favorites as DefaultResponseType).error !== undefined) {
          throw new Error((favorites as DefaultResponseType).message);
        }
        if ((cart as DefaultResponseType).error !== undefined) {
          throw new Error((cart as DefaultResponseType).message);
        }

        this.productsInFavorite = favorites as FavoriteType[];
        this.productsInCart = (cart as CartType).items;

        this.productsInFavorite.forEach((favoriteItem: FavoriteType) => {
          const currentItem: FavoriteType | FavoriteWithCartCountType = favoriteItem;
          (currentItem as FavoriteWithCartCountType).countInCart = 0;

          if (this.productsInCart && this.productsInCart.length > 0) {
            const matchingItem = this.productsInCart.find((item) => currentItem.id === item.product.id);
            if (matchingItem) {
              (currentItem as FavoriteWithCartCountType).countInCart = matchingItem.quantity;
            }
          }
          this.favoriteProductsWithCartCount.push((currentItem as FavoriteWithCartCountType));
        });
      });
  }

  removeFromFavorites(id: string): void {
    this.favoriteService.removeFavorite(id)
      .subscribe((data: DefaultResponseType) => {
        if (data.error) {
          // ..
          throw new Error(data.message);
        }

        this.favoriteProductsWithCartCount = this.favoriteProductsWithCartCount.filter((item) => item.id !== id);
      });
  }

  addToCart(id: string): void {
    this._updateCountInProduct(1, id);
    this.updateCountOfProduct(1, id);
  }

  updateCountOfProduct(value: number, id: string): void {
    this.cartService.updateCart(id, value)
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        } else {
          this._updateCountInProduct(value, id);
        }
      });
  }

  removeFromCart(id: string): void {
    this.cartService.updateCart(id, 0)
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }

        this._updateCountInProduct(0, id);
      });
  }

  _updateCountInProduct(newCount: number, id: string): void {
    this.favoriteProductsWithCartCount.find((item) => item.id === id)!.countInCart = newCount;
  }
}
