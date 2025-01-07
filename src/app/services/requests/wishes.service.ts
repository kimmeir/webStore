import { IProduct } from './products';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IWishItem {
  id?: number;
  productId: number;
  product: IProduct;
}

@Injectable({
  providedIn: 'root'
})
export class WishesService {
  wishItems = signal<IWishItem[]>([])

  constructor(
    private http: HttpClient,
  ) {
  }

  getWishes(): Observable<IWishItem[]> {
    return this.http.get<IWishItem[]>('/wishes')
  }

  addToWish(productId: number | string): Observable<IWishItem[]> {
    return this.http.post<IWishItem[]>('/wishes/add-to-wishes', { productId });
  }

  removeFromWishes(productId: number | string): Observable<IWishItem[]> {
    return this.http.delete<IWishItem[]>('/wishes/remove-from-wishes', { params: { productId } });
  }
}
