import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './products.typings';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public products: IProduct[] = [];

  constructor(
    private http: HttpClient,
  ) {}

  getProducts(): void {
    this.http.get<IProduct[]>('/products')
      .subscribe((products) => this.products = products);
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`/products/${id}`);
  }

  getProductsByCategory(categoryId: number): void {
    this.http.get<IProduct[]>(`/categories/${categoryId}/products`)
      .subscribe((products) => this.products = products);
  }
}
