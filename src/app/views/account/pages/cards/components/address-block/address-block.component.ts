import { Component, Input } from '@angular/core';
import { IAddress } from '../../../../../../services/requests/profile/profile.typings';
import { InfoBlockComponent } from '../../../../../../shared/components/info-block/info-block.component';
import { AddressInfoComponent } from '../../../../../../shared/components/address-info/address-info.component';
import { MatIcon } from '@angular/material/icon';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-address-block',
  templateUrl: './address-block.component.html',
  styleUrl: './address-block.component.scss',
  imports: [
    InfoBlockComponent,
    AddressInfoComponent,
    MatIcon,
    ButtonComponent,
    RouterLink
  ],
  standalone: true
})
export class AddressBlockComponent {
  @Input() title!: string;
  @Input() address?: IAddress;
}
