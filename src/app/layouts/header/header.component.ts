import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { LoadingService } from '../../services/loading/loading';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { ProfileService } from '../../services/requests/profile/profile.service';
import { MatBadge } from '@angular/material/badge';
import { Store } from '@ngrx/store';
import { selectCartTotal } from '../../state/cart/cart.selectors';
import { AsyncPipe } from '@angular/common';

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
    LoginDialogComponent,
    MatBadge,
    AsyncPipe,
  ],
  standalone: true
})
export class HeaderComponent {
  loadingService = inject(LoadingService);
  profileService = inject(ProfileService);
  store = inject(Store);

  title = 'Andrew store app';
  isLoading = this.loadingService.isLoading;
  cartCount$ = this.store.select(selectCartTotal);

  constructor(
    private router: Router,
  ) {
  }

  onCartClick() {
    this.router.navigate(['/cart']);
  }

  onProfileClick() {
    this.profileService.isAuthorized()
      ? this.router.navigate(['/profile'])
      : this.profileService.isLoginModalOpen.set(true);
  }
}
