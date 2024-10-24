import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ProfileService } from '../../services/requests/profile/profile.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { profileLogout } from '../../state/profile/profile.actions';
import { CardsComponent } from './pages/cards/cards.component';
import { INavItem, NavigationComponent } from './component/navigation/navigation.component';
import { RouterOutlet } from '@angular/router';
import { DataRowOutlet } from '@angular/cdk/table';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatButton,
    AsyncPipe,
    NgIf,
    CardsComponent,
    NavigationComponent,
    RouterOutlet,
    DataRowOutlet
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  profileService = inject(ProfileService);
  store = inject(Store);
  user = this.profileService.user;

  constructor() {
    this.profileService.getProfile();
  }

  navigationList: INavItem[] = [
    { title: 'Billing', link: '/account/billing', icon: 'credit_card' },
    { title: 'Settings', link: '/account/settings', icon: 'settings' },
    { title: 'Logout', click: () => this.store.dispatch(profileLogout()), icon: 'logout' }
  ];
}
