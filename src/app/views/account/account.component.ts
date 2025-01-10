import { Component, inject } from '@angular/core';
import { ProfileService } from '../../services/requests/profile/profile.service';
import { Store } from '@ngrx/store';
import { profileLogout } from '../../state/profile/profile.actions';
import { INavItem, NavigationComponent } from './component/navigation/navigation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavigationComponent,
    RouterOutlet,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  profileService = inject(ProfileService);
  store = inject(Store);

  constructor() {
    this.profileService.getProfile();
  }

  navigationList: INavItem[] = [
    { title: 'Order History', link: '/account/orders', icon: 'storefront' },
    { title: 'Cards & Address', link: '/account/billing', icon: 'credit_card' },
    { title: 'Settings', link: '/account/settings', icon: 'settings' },
    { title: 'Logout', click: () => this.store.dispatch(profileLogout()), icon: 'logout' }
  ];
}
