import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

interface INavItem {
  title: string;
  link: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  navItems: INavItem[] = [
    {
      title: 'Categories',
      link: '/categories',
    }
  ];

}
