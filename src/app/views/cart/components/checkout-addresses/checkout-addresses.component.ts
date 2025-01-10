import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { AddressFormComponent } from '../../../../shared/components/address-form/address-form.component';
import { InfoBlockComponent } from '../../../../shared/components/info-block/info-block.component';
import { ProfileService } from '../../../../services/requests/profile/profile.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout-addresses',
  templateUrl: './checkout-addresses.component.html',
  styleUrl: './checkout-addresses.component.scss',
  imports: [
    MatCheckbox,
    FormsModule,
    AddressFormComponent,
    InfoBlockComponent,
    NgIf,
  ],
  standalone: true
})
export class CheckoutAddressesComponent {
  @ViewChild('billingForm') billingForm!: AddressFormComponent;
  @ViewChild('shippingForm') shippingForm!: AddressFormComponent;
  private profileService = inject(ProfileService);

  user = this.profileService.user;
  isShipDiffAsBill = signal<boolean>(false);
}
