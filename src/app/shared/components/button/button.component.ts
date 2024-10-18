import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatButton,
    NgClass,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent extends MatButton {
  @Input() override color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() variant: 'contained' | 'outlined' = 'contained';
  @Input() block = false;
}
