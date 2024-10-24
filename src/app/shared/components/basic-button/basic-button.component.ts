import { Component, HostBinding, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'button[basic-button]',
  standalone: true,
  imports: [
    MatButton,
    MatIcon
  ],

  templateUrl: './basic-button.component.html',
  styleUrl: './basic-button.component.scss'
})
export class BasicButtonComponent {
  @Input() color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';

  @HostBinding('class') get classes(): string {
    return `basic-button basic-button-${this.color}`;
  }
}
