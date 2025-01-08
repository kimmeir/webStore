import { Component, effect, inject } from '@angular/core';
import { InfoBlockComponent } from '../../../../shared/components/info-block/info-block.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ProfileService } from '../../../../services/requests/profile/profile.service';
import { AsyncPipe, JsonPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { AddressFormComponent } from '../../../../shared/components/address-form/address-form.component';

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
    AddressFormComponent,
    JsonPipe,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  profileService = inject(ProfileService);
  user = this.profileService.user;

  form = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor() {
    effect(() => {
      // @ts-ignore
      this.form.patchValue(this.user());
    });
  }

  onSubmit() {
    if (this.form.valid)
      this.profileService.updateProfile(this.form.value)
        .subscribe();
  }

  onSubmitBillAddress(value: any) {
    this.profileService.updateAddress('bill', value)
      .subscribe();
  }

  onSubmitShipAddress(value: any) {
    this.profileService.updateAddress('ship', value)
      .subscribe();
  }
}
