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
  ],
  standalone: true
})
export class HeaderComponent {
  public loadingService = inject(LoadingService);
  title = 'Andrew store app';
  modalVisible = false;
  isLoading = this.loadingService.isLoading;

  constructor(
    private profileService: ProfileService,
    private router: Router,
  ) {}

  onCartClick() {
    this.router.navigate(['/cart']);
  }

  onProfileClick() {
    this.profileService.isAuthorized()
      ? this.router.navigate(['/profile'])
      : this.modalVisible = true;
  }
}
