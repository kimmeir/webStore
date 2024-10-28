import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-info-block',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './info-block.component.html',
  styleUrl: './info-block.component.scss'
})
export class InfoBlockComponent {
  @Input() noPadding = false;
}
