import { Component, effect, inject } from '@angular/core';
import { InfoBlockComponent } from '../../../../shared/components/info-block/info-block.component';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ProfileService } from '../../../../services/requests/profile/profile.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    InfoBlockComponent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ButtonComponent,
    NgOptimizedImage,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  profileService = inject(ProfileService);
  fb = inject(UntypedFormBuilder);
  user = this.profileService.user;

  constructor() {
    effect(() => {
      // @ts-ignore
      this.form.patchValue(this.user());
    });
  }

  form = this.fb.group({
    first_name: ['', Validators.required],
    last_name: [''],
    email: ['', Validators.required, Validators.email],
  });

  onSubmit() {
    console.log('submit', this.form.value);
  }
}
