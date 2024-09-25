import { Component } from '@angular/core';
import { CategoriesService } from '../../services/requests';
import { CardComponent } from '../../shared/components/card/card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  constructor(
    private router: Router,
    protected categoriesService: CategoriesService
  ) {
    this.categoriesService.getAllCategories()
  }

  onCategoryClick(id: number) {
    this.router.navigate(['/products'], { queryParams: { categoryId: id } });
  }
}
