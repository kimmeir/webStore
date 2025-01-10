import { Component } from '@angular/core';
import { InfoBlockComponent } from '../../../../../shared/components/info-block/info-block.component';
import { IOrder, IOrderItem, OrderService } from '../../../../../services/requests/order.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderItemsComponent } from '../components/order-items/order-items.component';
import { AddressInfoComponent } from '../../../../../shared/components/address-info/address-info.component';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    InfoBlockComponent,
    CurrencyPipe,
    DatePipe,
    OrderItemsComponent,
    AddressInfoComponent,
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  order!: IOrder;
  orderItems!: IOrderItem[];
  orderId!: number;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));

    this.orderService.getOrderByID(this.orderId)
      .subscribe(order => this.order = order);
    this.orderService.getOrderItemsByOrderID(this.orderId)
      .subscribe(orderItems => this.orderItems = orderItems);
  }
}
