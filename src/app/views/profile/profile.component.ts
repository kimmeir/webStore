import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ProfileService } from '../../services/requests/profile/profile.service';
import { Router } from '@angular/router';
import { IUser } from '../../services/requests/profile/profile.typings';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user$: IUser | null = null;
  constructor(
    protected profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.profileService.getProfile()
      .add(() => this.user$ = this.profileService.user);
  }

  logout() {
    this.profileService.logout();
    this.router.navigate(['/']);
  }
}
