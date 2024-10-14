import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct, IProductAddToCart } from './products';

export interface ICartItem {
  id?: number;
  cartId?: number;
  productId: number;
  product: IProduct;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<ICartItem[]>([])

  constructor(
    private http: HttpClient,
  ) {
  }

  getCart(): Observable<ICartItem[]> {
    return this.http.get<ICartItem[]>('/cart')
  }

  addToCart(product: ICartItem): Observable<any> {
    return this.http.post('/cart/add-to-cart', { productId: product.productId, quantity: product.quantity });
  }

  removeFromCart(cartItemId: string | number): Observable<ICartItem[]> {
    console.log('Remove from cart:', cartItemId)
    return this.http.delete<ICartItem[]>('/cart/remove-from-cart', { params: { id: cartItemId } });
  }

  bulkAddToCart(products: IProductAddToCart[]): Observable<any> {
    return this.http.post('/cart/bulk-add-to-cart', products);
  }
}
