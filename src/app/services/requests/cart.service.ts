import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct, IProductAddToCart } from './products';

export interface ICartItem {
  id: number;
  cartId: number;
  productId: number;
  product: IProduct;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<ICartItem[]>([])
  constructor(private http: HttpClient) {}

  getCart(): void {
    this.http.get<ICartItem[]>('/cart')
      .subscribe((cartItems) => this.cartItems.set(cartItems));
  }

  addToCart(product: IProductAddToCart): Observable<any> {
    return this.http.post('/cart/add-to-cart',  product);
  }

  removeFromCart(cartItemId: string | number): Observable<ICartItem[]> {
    return this.http.delete<ICartItem[]>('/cart/remove-from-cart', { params: { id: cartItemId }});
  }
}
