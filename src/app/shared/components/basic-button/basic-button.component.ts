import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'button[basic-button]',
  standalone: true,
  templateUrl: './basic-button.component.html',
  styleUrl: './basic-button.component.scss'
})
export class BasicButtonComponent {
  @Input() color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';

  @HostBinding('class') get classes(): string {
    return `basic-button basic-button-${this.color}`;
  }
}
