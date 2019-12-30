import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/internal/Observable';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartItemCount: number;
  cart$;
  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges().pipe(
        map((x: any) =>
          new ShoppingCart(x.items))
      );
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.key != null) {
        let quantity = (item.payload.val().quantity || 0) + 1;
        if (quantity === 0) item$.remove();
        else item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      }
      else {
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1
        });
      }
    });
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.key != null) {
        let quantity = (item.payload.val().quantity || 0) - 1;
        if (quantity === 0) item$.remove();
        else item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      }
    });
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

}
