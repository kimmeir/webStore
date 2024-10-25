import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { SignUpComponent } from './forms/sign-up/sign-up.component';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    LoginFormComponent,
    SignUpComponent,
  ],
  template: `
    <mat-tab-group animationDuration="300ms">
      <mat-tab label="Sign in">
        <app-login-form/>
      </mat-tab>
      <mat-tab label="Sign up">
        <app-sign-up/>
      </mat-tab>
    </mat-tab-group>
  `,
})
export class AuthDialogComponent {
}
