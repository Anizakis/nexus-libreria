import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//API
export class BooksService {
  // usar API real; si falla usar assets/books.json
  private apiUrl = 'https://mock.apidog.com/m1/1069422-1057565-default/books';
  private fallbackUrl = 'assets/books.json';

  constructor(private http: HttpClient) {}

  private normalizeList(books: any[]): any[] {
    return books.map(book => ({
      id: book.id ?? book._id ?? book.isbn,
      title: book.titulo ?? book.title,
      author: book.autor ?? book.author,
      year: book.año ?? book.year,
      description: book.sinopsis ?? book.description,
      image: book.imagen ?? book.image,
      category: book.categoria ?? book.category,
      price: book.precio ?? book.price
    }));
  }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(list => this.normalizeList(list)),
      catchError(err => {
        console.warn('Books API falló, uso fallback local:', err);
        return this.http.get<any[]>(this.fallbackUrl).pipe(map(list => this.normalizeList(list)));
      })
    );
  }

  getBookById(id: string | number): Observable<any | undefined> {
    // Intento directo por id si la API soporta /:id; fallback a getBooks()
    const directUrl = `${this.apiUrl}/${id}`;
    return this.http.get<any>(directUrl).pipe(
      map(book => book ? this.normalizeList([book])[0] : undefined),
      catchError(() => this.getBooks().pipe(map(list => list.find(b => String(b.id) === String(id)))))
    );
  }
}
