import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    MatIconButton,
    MatIcon,
    RouterLink
  ],
  standalone: true
})
export class HeaderComponent {
  title = 'Andrew store app';
}
