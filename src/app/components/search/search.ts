import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books';
import { CartService } from '../../services/cart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent implements OnInit {
  title = '';
  author = '';
  year = '';
  category = '';

  books: any[] = [];
  private allBooks: any[] = [];
  categories: string[] = [];
  addedMessage: string | null = null;
  error: string | null = null; // <-- propiedad añadida para las alertas

  constructor(
    private svc: BooksService,
    private router: Router,
    private cart: CartService,
    private cdr: ChangeDetectorRef
  ) { }

  // Navegar a detalle
  viewBookDetails(id: any): void {
    if (id == null) return;
    this.router.navigate(['/catalogo', id]);
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.svc.getBooks().subscribe({
      next: (data) => {
        this.allBooks = Array.isArray(data) ? data : [];
        this.books = [...this.allBooks];
        const set = new Set<string>();
        this.allBooks.forEach(b => {
          if (b.category) set.add(b.category);
        });
        this.categories = Array.from(set).sort();
      },
      error: (err) => {
        console.error('Error loading books', err);
        this.allBooks = [];
        this.books = [];
      }
    });
  }

  // Filtros para buscar libros
  searchBooks(): void {
    const title = this.title.trim().toLowerCase();
    const author = this.author.trim().toLowerCase();
    const year = this.year.trim();
    const category = this.category.trim().toLowerCase();

    this.books = this.allBooks.filter((b: any) => {
      const matchesTitle = !title || (b.title && b.title.toLowerCase().includes(title));
      const matchesAuthor = !author || (b.author && b.author.toLowerCase().includes(author));
      const matchesYear = !year || (b.year && String(b.year).includes(year));
      const matchesCategory = !category || (b.category && b.category.toLowerCase().includes(category));
      return matchesTitle && matchesAuthor && matchesYear && matchesCategory;
    });
  }

  // Añado los libros al carrito
  addToCart(book: any): void {
    try {
      this.cart.add({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.image,
        qty: 1
      });
      console.log('Añadido al carrito', book);
    } catch (e) {
      console.error('No se pudo añadir al carrito', e);
    }
  }

  // Muestra la confirmación 
  showAddedMessage(title: string | undefined): void {
    this.addedMessage = `${title ?? 'Ítem'} añadido al carrito.`;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.addedMessage = null;
      this.cdr.detectChanges();
    }, 2500);
  }

}