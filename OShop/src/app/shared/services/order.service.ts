import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,private shoppingCartService: ShoppingCartService) { }

  stateOrder(order) {
  let result =  this.db.list('/orders').push(order);
  this.shoppingCartService.clearCart();
  return result;
  }

  getOrders(){
    return this.db.list('/orders').snapshotChanges();
  }

  getOrdersByUser(userId : string){
    return this.db.list('/orders', ref=>ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
  }
}
