import { Component, inject } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { Router } from '@angular/router';
import { CategoriesService, IProductCategory } from '../../services/requests/categories';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CardComponent,
    AsyncPipe,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categoriesService = inject(CategoriesService);
  categories$: Observable<IProductCategory[]> = this.categoriesService.getAllCategories();

  constructor(private router: Router) {}

  onCategoryClick(id: number | string) {
    this.router.navigate(['/products'], { queryParams: { categoryId: id } });
  }
}
