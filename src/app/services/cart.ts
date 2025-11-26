import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number | string;
  title: string;
  author?: string;
  price?: number;
  image?: string;
  qty: number;
  meta?: any;
  reservationId?: string | number | null;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'nexus_cart';
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  items$ = this.itemsSubject.asObservable();

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((it: any) => ({ ...it }));
    } catch (e) {
      console.error('Failed to load cart from storage', e);
      return [];
    }
  }

  private saveToStorage(items: CartItem[]) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }

  getItems(): CartItem[] {
    return this.itemsSubject.getValue();
  }

  add(item: Partial<CartItem> & { id: any, title: string }) {
    const items = this.getItems();
    const existing = items.find(i => i.id === item.id);
    if (existing) {
      existing.qty += item.qty ?? 1;
    } else {
      items.push({
        id: item.id,
        title: item.title,
        author: item.author,
        price: item.price ?? 0,
        image: item.image,
        qty: item.qty ?? 1
      });
    }
    this.itemsSubject.next([...items]);
    this.saveToStorage(items);
  }

  updateQty(id: any, qty: number) {
    const items = this.getItems();
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return;
    if (qty <= 0) {
      items.splice(idx, 1);
    } else {
      items[idx].qty = qty;
    }
    this.itemsSubject.next([...items]);
    this.saveToStorage(items);
  }

  remove(id: any) {
    const items = this.getItems().filter(i => i.id !== id);
    this.itemsSubject.next([...items]);
    this.saveToStorage(items);
  }
    /**
   * Calcula el total del carrito (price * qty).
   */
  getTotal(): number {
    try {
      const items: any[] = (typeof (this as any).getItems === 'function') ? (this as any).getItems() : [];
      return (items || []).reduce((s, it) => {
        const qty = Number(it.qty ?? it.quantity ?? 0) || 0;
        const price = Number(it.price ?? 0) || 0;
        return s + (qty * price);
      }, 0);
    } catch (e) {
      return 0;
    }
  }


  /**
   * Vacía el carrito
   */
  clear(): void {
    try {
      const anyThis: any = this as any;
      if (anyThis.itemsSubject && typeof anyThis.itemsSubject.next === 'function') {
        anyThis.itemsSubject.next([]);
      } else {
        // fallback: borrar persistencia local
        localStorage.removeItem('cart');
      }
    } catch (e) {
      try { localStorage.removeItem('cart'); } catch {}
    }
  }

  /**
   * Guardar reserva local (para recuperarla en checkout).
   */
  saveReservation(roomId: string | number, date: string, hours: number): void {
    try {
      localStorage.setItem('reservation', JSON.stringify({ roomId, date, hours, savedAt: new Date().toISOString() }));
    } catch (e) { console.warn('No se pudo guardar la reserva', e); }
  }

  /**
   * Obtener reserva local.
   */
  getReservation(): any {
    try {
      const stored = localStorage.getItem('reservation');
      return stored ? JSON.parse(stored) : null;
    } catch (e) { return null; }
  }

  /**
   * Limpiar reserva al enviar pedido.
   */
  clearReservation(): void {
    try { localStorage.removeItem('reservation'); } catch {}
  }
}
