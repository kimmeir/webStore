import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    MatProgressSpinner
  ],
  template: `
    <div class="loading">
      <mat-spinner
        [diameter]="diameter"
        [strokeWidth]="3"
      />
    </div>
  `,
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  @Input() diameter: number = 70;

}
