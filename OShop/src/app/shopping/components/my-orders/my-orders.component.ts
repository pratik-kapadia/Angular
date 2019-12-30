import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { AngularFireList } from '@angular/fire/database';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(private authService: AuthService, private orderService: OrderService) {
    this.orders$ = authService.user$.pipe(switchMap(u => this.orderService.getOrdersByUser(u.uid)));
  }

  ngOnInit() {
  }

}
