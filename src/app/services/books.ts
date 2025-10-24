import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//API
export class BooksService {

  //Dado que se cayó la API, utilizo un archivo json local
  //private apiUrl = 'https://mock.apidog.com/m1/1069422-1057565-default/books';
  private apiUrl = 'assets/books.json';
  constructor(private http: HttpClient) {}

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(books => books.map(book => ({
        id: book.id,
        title: book.titulo,
        author: book.autor,
        year: book.año,
        description: book.sinopsis,
        image: book.imagen,
        category: book.categoria,
        price: book.precio
      })))
    );
  }

  getBookById(id: string | number): Observable<any | undefined> {
    // Uso getBooks() porque la API no tiene endpoint para un solo libro
    return this.getBooks().pipe(
      map((list: any[]) => list.find(b => String(b.id) === String(id)))
    );
  }
}
