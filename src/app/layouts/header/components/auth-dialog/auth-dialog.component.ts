import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { SignUpComponent } from './forms/sign-up/sign-up.component';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    LoginFormComponent,
    DialogComponent,
    SignUpComponent,
  ],
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss'
})
export class AuthDialogComponent {

}
