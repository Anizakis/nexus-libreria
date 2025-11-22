import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnDestroy {
  cartCount = 0;
  private sub?: Subscription;

  constructor(private router: Router, private cart: CartService) {
    this.sub = this.cart.items$.subscribe((items: any[]) => {
      // CartService uses 'qty' for quantity
      this.cartCount = (items || []).reduce((s: number, i: any) => s + (i.qty ?? 0), 0);
    });
  }

  openCart() {
    window.location.href = '/cart';
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
