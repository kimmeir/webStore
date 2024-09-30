import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard, MatCardContent, MatCardImage, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { CurrencyPipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

interface ICardItem {
  id: number | string;
  title: string;
  description?: string;
  price?: number;
  image?: string;
}
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardImage,
    NgOptimizedImage,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    TitleCasePipe,
    CurrencyPipe,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() item!: ICardItem;
  @Output() click = new EventEmitter<number | string>();

  constructor(private router: Router) { }

  clickHandler() {
    this.click.emit(this.item.id);
  }
}
