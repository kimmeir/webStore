import { Component, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ProfileService } from '../../../../services/requests/profile/profile.service';
import { Store } from '@ngrx/store';
import { profileActions } from '../../../../state/profile/profile.actions';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {
  profileService = inject(ProfileService);
  visible = this.profileService.isLoginModalOpen;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store) {
  }

  onSubmit() {
    // @ts-ignore
    this.store.dispatch(profileActions.login(this.loginForm.value));
  }
}
