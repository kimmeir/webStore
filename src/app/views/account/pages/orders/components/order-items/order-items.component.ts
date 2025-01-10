import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IOrderItem } from '../../../../../../services/requests/order.service';

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.scss'
})
export class OrderItemsComponent {
  @Input() orderItems!: IOrderItem[];
}
