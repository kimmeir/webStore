import { Component, inject } from '@angular/core';
import { InfoBlockComponent } from '../../../../shared/components/info-block/info-block.component';
import { MatTableModule } from '@angular/material/table';
import { IOrder, OrderService } from '../../../../services/requests/order.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { BasicButtonComponent } from '../../../../shared/components/basic-button/basic-button.component';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    InfoBlockComponent,
    AsyncPipe,
    MatTableModule,
    NgIf,
    CurrencyPipe,
    DatePipe,
    BasicButtonComponent,
    MatIcon,
    RouterLink
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  private orderService = inject(OrderService);
  orders$!: Observable<IOrder[]>;

  constructor() {
    this.orders$ = this.orderService.getOrders();
  }

  displayedColumns: string[] = ['id', 'status', 'createdAt', 'total', 'actions'];

}
