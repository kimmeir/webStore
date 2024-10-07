import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard, MatCardContent, MatCardImage, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { CurrencyPipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

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
    MatButton,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() item!: ICardItem;
  @Input() isProduct = false;

  @Output() click = new EventEmitter<number | string>();
  @Output() onAddToCart = new EventEmitter<number | string | object>();

  onClick() {
    this.click.emit(this.item.id);
  }

  onClickAddToCart(event: Event) {
    event.stopPropagation();
    this.onAddToCart.emit(this.item);
  }
}
