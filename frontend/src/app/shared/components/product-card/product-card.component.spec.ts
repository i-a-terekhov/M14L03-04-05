import {ProductCardComponent} from "./product-card.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CartService} from "../../services/cart.service";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FavoriteService} from "../../services/favorite.service";
import {of} from "rxjs";

describe('product card', () => {

  let productCardComponent: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(() => {
    const cartServiceSpy = jasmine.createSpyObj("CartService", ['updateCart']);
    const authServiceSpy = jasmine.createSpyObj("AuthService", ['getIsLoggedIn']);
    const routerSpy = jasmine.createSpyObj("Router", ['navigate']);
    const _snackBarSpy = jasmine.createSpyObj("MatSnackBar", ['open']);
    const favoriteServiceSpy = jasmine.createSpyObj("FavoriteService", ['removeFavorite', 'addFavorite']);

    TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      providers: [
        {provide: CartService, useValue: cartServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: MatSnackBar, useValue: _snackBarSpy},
        {provide: FavoriteService, useValue: favoriteServiceSpy},
      ]
    });
    fixture = TestBed.createComponent(ProductCardComponent);
    productCardComponent = fixture.componentInstance;
  });

  it('should have count init value 1', () => {
    expect(productCardComponent.count).toBe(1);
  });

  it('should set value from input countInCart to count', () => {
    productCardComponent.count = 5;
    fixture.detectChanges();  // эта функция запускает цикл отслеживания изменений
    expect(productCardComponent.count).toBe(5);
  });

  it('should call removeFromCart with count = 0', () => {
    let cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    cartServiceSpy.updateCart.and.returnValue(of({
        items: [
          {
            product: {
              id: '1',
              name: '1',
              price: 1,
              image: '1',
              url: '1',
            },
            quantity: 1,
          }
        ]
      }
    ));

    const product = {
      id: 'test',
      name: 'test',
      price: 1,
      image: 'test',
      lightning: 'test',
      humidity: 'test',
      temperature: 'test',
      height: 1,
      diameter: 1,
      url: 'test',
      type: {
        id: 'test',
        name: 'test',
        url: 'test',
      },
    };

    productCardComponent.product = product;

    productCardComponent.removeFromCart();

    expect(cartServiceSpy.updateCart).toHaveBeenCalledWith(product.id, 0);
  });

});
