import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ProfileService } from '../../services/requests/profile/profile.service';
import { Router } from '@angular/router';
import { IUser } from '../../services/requests/profile/profile.typings';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

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

  constructor(private router: Router) {}

  logout() {
    this.profileService.logout();
    this.router.navigate(['/']);
  }
}
