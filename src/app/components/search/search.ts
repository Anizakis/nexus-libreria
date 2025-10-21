import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BooksService } from '../../services/books';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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

  constructor(
    private booksService: BooksService, 
    private cartService: CartService,
    private router: Router
  ) {}

  viewBookDetails(bookId: string) {
    this.router.navigate(['/book-detail', bookId]);
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.booksService.getBooks().subscribe({
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

  // Muestro los libros en cards de Bootstrap
  addToCart(book: any): void {
    try {
      this.cartService.add({
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

}