import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../../services/books';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css']
})
export class BookDetailComponent implements OnInit {
  book: any = null;
  qty: number = 1;
  loading = true;
  error: string | null = null;

  decrementQty(): void {
    if (this.qty > 1) {
      this.qty--;
    }
  }

  incrementQty(): void {
    if (this.qty < 99) {
      this.qty++;
    }
  }

  updateQty(event: any): void {
    const value = parseInt(event.target.value);
    if (isNaN(value) || value < 1) {
      this.qty = 1;
    } else if (value > 99) {
      this.qty = 99;
    } else {
      this.qty = value;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    if (!id) {
      this.error = 'ID de libro no proporcionado.';
      this.loading = false;
      return;
    }

    this.booksService.getBookById(id).subscribe({
      next: (book) => {
        this.book = book;
        if (!book) {
          this.error = 'Libro no encontrado.';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el libro:', err);
        this.error = 'No se pudo cargar el libro.';
        this.loading = false;
      }
    });
  }

  addToCart(): void {
    if (!this.book) return;
    // Llamadas a CartService: adapta según la API real de tu servicio (add, addToCart, pushItem...)
    if ((this.cartService as any).add) {
      (this.cartService as any).add(this.book, this.qty);
    } else if ((this.cartService as any).addToCart) {
      (this.cartService as any).addToCart(this.book, this.qty);
    } else {
      // Fallback mínimo: emitir en consola y navegar al carrito
      console.warn('CartService no expone add/addToCart. Ajusta BookDetailComponent para integrar carrito.');
    }
    // Navegar al carrito para confirmar al usuario
    this.router.navigate(['/cart']);
  }

  back(): void {
    // Volvemos siempre al catálogo
    this.router.navigate(['/search']);
  }

  isOnSale(): boolean {
    // Criterio estético para destacar ofertas (ejemplo: price < 15)
    return !!this.book && this.book.price && Number(this.book.price) < 15;
  }
}
