import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './404.component.html',
  styleUrl: './404.component.scss'
})
export class NotFoundComponent {
  constructor(private location: LocationStrategy) {
  }

  goBack() {
    this.location.back();
  }
}
