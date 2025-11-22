import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CafeteriaService {
  private baseUrl = 'https://mock.apidog.com/m1/1069422-1057565-default';
  private productsCache: any[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`).pipe(
      tap(list => { this.productsCache = list || []; })
    );
  }

  getProductById(id: string | number): Observable<any> {
    // Buscar en caché primero (asegura usar la misma imagen que en la lista)
    const cached = this.productsCache.find(p => String(p.id) === String(id));
    if (cached) {
      return of(cached);
    }
    return this.http.get<any>(`${this.baseUrl}/products/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/products/categories`);
  }

  placeOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orders`, order);
  }
}
