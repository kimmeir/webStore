import { Component } from '@angular/core';
import { HeaderComponent } from './layouts/header/header.component';
import { MainComponent } from './layouts/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
