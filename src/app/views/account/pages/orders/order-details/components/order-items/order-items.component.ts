import { Component, Input } from '@angular/core';
import { IOrderItem } from '../../../../../../../services/requests/order.service';
import { CurrencyPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { BasicButtonComponent } from '../../../../../../../shared/components/basic-button/basic-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    JsonPipe,
    BasicButtonComponent,
    RouterLink
  ],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.scss'
})
export class OrderItemsComponent {
  @Input() orderItems!: IOrderItem[];
}
