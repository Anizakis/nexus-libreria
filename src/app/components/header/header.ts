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
  private sub: Subscription | null = null;

  constructor(private cart: CartService, private router: Router) {
    this.sub = this.cart.items$.subscribe(list => {
      this.cartCount = list.reduce((s, it) => s + (it.qty ?? 0), 0);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  openCart() {
    this.router.navigate(['/cart']);
  }
}
