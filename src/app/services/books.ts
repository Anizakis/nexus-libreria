import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//API
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
          //Funcion para precio inventado
          price: (function() {
            const p = item.precio ?? item.price;
            const pNum = p != null && !isNaN(Number(p)) ? Number(p) : NaN;
            if (!isNaN(pNum) && pNum >= 10 && pNum <= 30) {
              return Math.round(pNum * 100) / 100;
            }
        
            const idNum = parseInt(String(item.id).replace(/[^0-9]/g, '')) || 0;
            const hash = (idNum * 1234567) % 21; 
            return 10 + hash; 
          })()
        }));
      })
    );
  }

  getBookById(id: string | number): Observable<any | undefined> {
    // Uso getBooks() porque la API no tiene endpoint para un solo libro
    return this.getBooks().pipe(
      map((list: any[]) => list.find(b => String(b.id) === String(id)))
    );
  }
}
