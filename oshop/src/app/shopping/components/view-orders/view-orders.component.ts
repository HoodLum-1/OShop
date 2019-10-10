import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent {
  @Input('cart') cart: ShoppingCart;
  // orders$;

  // constructor(
  //   private authService: AuthService,
  //   private orderService: OrderService
  //    ) {
  //      this.orders$ = authService.user$.switchMap(u => orderService.getOrderByOrder(u.uid));
  //    }

}
