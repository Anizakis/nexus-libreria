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
  qty: number = 1; // two-way binding
  loading = true;
  error: string | null = null;

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

    // Intentar usar getBookById si existe, si no, fallback a listado
    // Ajusta los nombres de método según tu BooksService real.
    if ((this.booksService as any).getBookById) {
      (this.booksService as any).getBookById(id).subscribe({
        next: (b: any) => { this.book = b; this.loading = false; },
        error: (err: any) => { this.error = 'No se pudo cargar el libro.'; this.loading = false; }
      });
    } else if ((this.booksService as any).getBooks) {
      (this.booksService as any).getBooks().subscribe({
        next: (list: any[]) => {
          this.book = list.find(x => String(x.id) === id) || null;
          if (!this.book) this.error = 'Libro no encontrado.';
          this.loading = false;
        },
        error: () => { this.error = 'No se pudo cargar los libros.'; this.loading = false; }
      });
    } else {
      this.error = 'BooksService no expone métodos esperados. Ajusta BookDetailComponent.';
      this.loading = false;
    }
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
    this.router.navigate(['/']);
  }

  isOnSale(): boolean {
    // Criterio estético para destacar ofertas (ejemplo: price < 15)
    return !!this.book && this.book.price && Number(this.book.price) < 15;
  }
}
