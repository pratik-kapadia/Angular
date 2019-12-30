import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { CommonModule } from '@angular/common'
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemCount: number;
  cart$
  subscription: Subscription;
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {

    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }
}
