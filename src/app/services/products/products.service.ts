import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../settings';
import { IProduct } from './products.typing';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${baseUrl}products`);
  }

  getProduct(id: number): Observable<IProduct> {
    console.log('id', id);
    return this.http.get<IProduct>(`${baseUrl}products/${id}`);
  }
}
