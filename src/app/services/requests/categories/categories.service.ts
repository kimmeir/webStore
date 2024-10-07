import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProductCategory } from './categories.typings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public categories: IProductCategory[] = [];

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<IProductCategory[]> {
    return this.http.get<IProductCategory[]>('/categories')
  }

  getCategoryById(id: number): Observable<IProductCategory> {
    return this.http.get<IProductCategory>(`/categories/${id}`)
  }
}
