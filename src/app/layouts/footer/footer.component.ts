import { Component, inject } from '@angular/core';
import { JokeService } from '../../services/requests/joke.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  jokeService = inject(JokeService);
  joke$ = this.jokeService.getJoke();
}
