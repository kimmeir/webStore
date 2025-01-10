import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { IAddress } from '../../../services/requests/profile/profile.typings';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    ButtonComponent,
    NgIf
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {
  @Input() initialData?: IAddress;
  @Input() showButton: boolean = true;
  @Output() onSubmit = new EventEmitter<Partial<IAddress>>();

  public form = new FormGroup({
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
  })

  ngOnChanges() {
    this.form.patchValue(this.initialData as IAddress);
  }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
      this.form.markAsUntouched();
    }
  }
}
