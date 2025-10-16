import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnDestroy {
  items: CartItem[] = [];
  private sub: Subscription | null = null;

  constructor(private cartService: CartService) {
    this.sub = this.cartService.items$.subscribe(list => this.items = list);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  changeQty(item: CartItem, delta: number) {
    const newQty = item.qty + delta;
    this.cartService.updateQty(item.id, newQty);
  }

  setQty(item: CartItem, value: string) {
    const qty = parseInt(value, 10) || 0;
    this.cartService.updateQty(item.id, qty);
  }

  remove(item: CartItem) {
    this.cartService.remove(item.id);
  }

  clear() {
    this.cartService.clear();
  }

  total(): number {
    return this.items.reduce((s, it) => s + ((it.price ?? 0) * (it.qty ?? 1)), 0);
  }
}
