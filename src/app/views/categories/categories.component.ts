import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { Router } from '@angular/router';
import { GetCategoriesGQL, GetCategoriesQuery } from '../../graphql/generated';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CardComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categories: GetCategoriesQuery['categories'] | undefined;

  constructor(
    private router: Router,
    private getCategoriesGQL: GetCategoriesGQL,
  ) {}

  ngOnInit() {
    this.getCategoriesGQL.fetch().subscribe(result => {
      this.categories = result.data.categories;
    });
  }

  onCategoryClick(id: number | string) {
    this.router.navigate(['/products'], { queryParams: { categoryId: id } });
  }
}
