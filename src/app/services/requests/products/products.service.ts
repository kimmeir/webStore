import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './products.typings';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public products = signal<IProduct[]>([]);

  constructor(
    private http: HttpClient,
  ) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('/products')
      // .subscribe((products) => this.products.set(products));
  }

  getProduct(id: number | string): Observable<IProduct> {
    return this.http.get<IProduct>(`/products/${id}`);
  }

  // getProductsByCategory(categoryId: number): void {
  //   this.http.get<IProduct[]>(`/categories/${categoryId}/products`)
  //     .subscribe((products) => this.products = products);
  // }
}
