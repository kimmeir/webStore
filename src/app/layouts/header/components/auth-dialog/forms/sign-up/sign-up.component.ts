import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ProfileService } from '../../../../../../services/requests/profile/profile.service';
import { first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ButtonComponent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog);

  signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
    },
    {
      validators: [this.passwordMatch as ValidatorFn]
    });

  constructor(private profileService: ProfileService) {
  }

  passwordMatch(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const passwordConfirmation = formGroup.get('password_confirmation')?.value;

    return password === passwordConfirmation ? null : { notMatching: true };
  }

  onSubmit() {
    // @ts-ignore
    this.profileService.signUp(this.signUpForm.value)
      .pipe(first())
      .subscribe({
        complete: () => {
          this.signUpForm.reset()
          this.snackBar.open('Account created', 'Close', { duration: 3000 });
          this.dialog.closeAll();
        }
      });

  }
}
