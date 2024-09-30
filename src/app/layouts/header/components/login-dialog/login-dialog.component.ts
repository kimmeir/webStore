import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { TokenService } from '../../../../services/token.service';
import { ProfileService } from '../../../../services/requests/profile/profile.service';
import { LoginGQL, LoginMutation } from '../../../../graphql/generated';

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
  @Input() visible!: boolean;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private loginGQL: LoginGQL,
    private tokenService: TokenService
  ) {}

  onSubmit() {
    //@ts-ignore
    this.loginGQL.mutate(this.loginForm.value)
      .subscribe(result => {
      if (result.data?.login) {
        this.tokenService.setToken(result.data.login.access_token);
        this.visible = false;
      }
    });
  }
}
