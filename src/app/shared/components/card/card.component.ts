import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard, MatCardContent, MatCardImage, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { CurrencyPipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { IProductCategory } from '../../../services/requests';

interface ICardItem {
  id: number;
  title: string;
  description?: string;
  price?: number;
  image: string;
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
  @Output() click = new EventEmitter<number>();

  constructor(private router: Router) { }

  clickHandler() {
    this.click.emit(this.item.id);
  }
}
