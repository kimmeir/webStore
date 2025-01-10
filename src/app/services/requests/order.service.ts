import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from './products';
import { IAddress } from './profile/profile.typings';

export interface IOrderPayload {
  paymentMethod: PaymentMethod;
  paymentMethodId?: string;
  amount: number;
  currency: string;
  billAddress?: Partial<IAddress> | null;
  shipAddress?: Partial<IAddress> | null;
}

export interface IOrder {
  id: number;
  status: string;
  total: number;
  billAddress: IAddress;
  shipAddress: IAddress;
  orderNotes?: string;
  createdAt: string;
}

export interface IOrderItem {
  id: number;
  orderId: number;
  product: IProduct;
  quantity: number;
  price: number;
}

export type PaymentMethod = 'default' | 'new';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  paymentMethod = signal<PaymentMethod>('default');

  constructor(private http: HttpClient) {
  }

  createOrder(data: IOrderPayload): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>('/order', data);
  }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('/order');
  }

  getOrderByID(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`/order/${id}`);
  }

  getOrderItemsByOrderID(id: number): Observable<IOrderItem[]> {
    return this.http.get<IOrderItem[]>(`/order/${id}/items`);
  }
}
