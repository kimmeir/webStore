import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProductCategory } from './categories.typings';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public categories: IProductCategory[] = [];

  constructor(
    private http: HttpClient,
  ) {}

  getAllCategories() {
    this.http.get<IProductCategory[]>('/categories')
      .subscribe((categories) => this.categories = categories);
  }

  getCategoryById(id: number) {
    return this.http.get<IProductCategory>(`/categories/${id}`)
  }
}
