import { Component, Input } from '@angular/core';
import { IAddress } from '../../../services/requests/profile/profile.typings';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-address-info',
  imports: [
    NgIf,
  ],
  templateUrl: './address-info.component.html',
  styleUrl: './address-info.component.scss',
  standalone: true
})
export class AddressInfoComponent {
  @Input() title?: string;
  @Input() address?: IAddress | null;
}
