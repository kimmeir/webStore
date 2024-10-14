import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ProfileService } from '../../services/requests/profile/profile.service';
import { IUser } from '../../services/requests/profile/profile.typings';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { profileLogout } from '../../state/profile/profile.actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatButton,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileService = inject(ProfileService);
  user$: Observable<IUser> = this.profileService.getProfile();

  constructor(private store: Store) {
  }

  logout() {
    this.store.dispatch(profileLogout());
  }
}
