import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiUrl = 'https://mock.apidog.com/m1/1069422-1057565-default/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data: any[]) => {
        if (!Array.isArray(data)) return [];
        return data.map(item => ({
          id: item.id,
          title: (item.titulo || item.title || '').toString().trim(),
          author: (item.autor || item.author || '').toString().trim(),
          year: item['año'] || item.año || item.year,
          synopsis: (item.sinopsis || item.synopsis || '').toString().trim(),
          image: (item.imagen || item.image || '').toString().trim(),
          category: (item.categoria || item.category || '').toString().trim(),
          price: item.precio || item.price
        }));
      })
    );
  }

  getBookById(id: number): Observable<any | undefined> {
    // The mock API may not provide a direct /:id endpoint, so reuse getBooks and find the item.
    return this.getBooks().pipe(
      map((list: any[]) => list.find(b => b.id === id))
    );
  }
  // Puedes añadir métodos para filtrar por título, autor, etc.
}
