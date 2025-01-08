import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { LoadingService } from '../../services/loading/loading';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { ProfileService } from '../../services/requests/profile/profile.service';
import { MatBadge } from '@angular/material/badge';
import { Store } from '@ngrx/store';
import { selectCartTotal } from '../../state/cart/cart.selectors';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/requests/products';
import { debounceTime, map, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    MatIconButton,
    MatIcon,
    RouterLink,
    MatProgressBar,
    MatToolbar,
    NavigationComponent,
    MatSelect,
    MatFormField,
    MatOption,
    MatBadge,
    AsyncPipe,
    FormsModule,
    JsonPipe,
  ],
  standalone: true
})
export class HeaderComponent {
  loadingService = inject(LoadingService);
  profileService = inject(ProfileService);
  store = inject(Store);
  dialog = inject(MatDialog);

  title = 'Andrew store app';
  isLoading = this.loadingService.isLoading;
  cartCount$ = this.store.select(selectCartTotal);
  searchTerm = '';
  searchObject = new Subject<string>();

  constructor(
    public router: Router,
    private productService: ProductsService,
  ) {
    this.searchObject
      .pipe(
        debounceTime(500),
        map(value => value.trim().toLowerCase())
      )
      .subscribe(value => {
        this.productService.getProducts(value);
      });
  }

  onCartClick() {
    this.router.navigate(['/cart']);
  }

  onWishesClick() {
    this.profileService.isAuthorized()
      ? this.router.navigate(['/wishes'])
      : this.openDialog();
  }

  onAccountClick() {
    this.profileService.isAuthorized()
      ? this.router.navigate(['/account'])
      : this.openDialog();
  }

  openDialog() {
    this.dialog.open(AuthDialogComponent, {
      width: '400px',
    });
  }


  onSearch(value: string) {
    this.searchObject.next(value);
  }
}
