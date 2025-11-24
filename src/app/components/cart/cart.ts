import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';
import { CafeteriaService } from '../../services/serviciocafeteria';
import { CoworkingService } from '../../services/serviciocoworking';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  items: any[] = [];
  
  // Checkout modal
  showCheckoutModal = false;
  contactName = '';
  contactEmail = '';
  delivery: 'mostrador' | 'mesa' | 'sala' = 'mostrador';
  selectedTableNumber: number | null = null;
  
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  hasReservation = false;

  constructor(
    private cart: CartService,
    private router: Router,
    private cafSvc: CafeteriaService,
    private coworkSvc: CoworkingService
  ) {}

  ngOnInit(): void {
    // Cargar items
    const anyCart: any = this.cart as any;
    if (anyCart.items$) {
      anyCart.items$.subscribe((items: any[]) => {
        this.items = items || [];
      });
    }

     // Verificar si hay reserva guardada
     const reservation = this.cart.getReservation?.();
     this.hasReservation = !!reservation;
   }

  // Métodos de edición del carrito
  changeQty(item: any, delta: number): void {
    const newQty = (item.qty || 1) + delta;
    if (newQty <= 0) {
      this.remove(item);
      return;
    }
    item.qty = newQty;
    // Actualizar items si CartService tiene método para persistir
    const anyCart: any = this.cart as any;
    if (anyCart.itemsSubject && typeof anyCart.itemsSubject.next === 'function') {
      anyCart.itemsSubject.next([...this.items]);
    }
  }

  setQty(item: any, value: string): void {
    const qty = parseInt(value, 10) || 0;
    if (qty <= 0) {
      this.remove(item);
      return;
    }
    item.qty = qty;
    const anyCart: any = this.cart as any;
    if (anyCart.itemsSubject && typeof anyCart.itemsSubject.next === 'function') {
      anyCart.itemsSubject.next([...this.items]);
    }
  }

  remove(item: any): void {
    const idx = this.items.indexOf(item);
    if (idx > -1) {
      this.items.splice(idx, 1);
      const anyCart: any = this.cart as any;
      if (anyCart.itemsSubject && typeof anyCart.itemsSubject.next === 'function') {
        anyCart.itemsSubject.next([...this.items]);
      }
    }
  }

  clear(): void {
    this.items = [];
    this.cart.clear?.();
  }

  // Calcular total (como método para mantener compatibilidad con plantilla)
  total(): number {
    return (typeof this.cart.getTotal === 'function') ? this.cart.getTotal() : 
           this.items.reduce((s, i) => s + ((i.price || 0) * (i.qty || 1)), 0);
  }

  // Abrir modal de checkout
  openCheckout(): void {
    if (this.items.length === 0) { this.errorMessage = 'El carrito está vacío.'; return; }
    this.showCheckoutModal = true;
  }

  // Cerrar modal
  closeCheckout(): void {
    this.showCheckoutModal = false;
  }

  // Enviar pedido desde el modal
  submitOrder(): void {
    if (!this.contactName.trim()) { this.errorMessage = 'Ingresa tu nombre.'; return; }
    if (!this.contactEmail.trim()) { this.errorMessage = 'Ingresa tu email.'; return; }
    if (this.delivery === 'mesa' && !this.selectedTableNumber) { this.errorMessage = 'Selecciona una mesa.'; return; }

    this.loading = true;
    this.errorMessage = null;

    const payload: any = {
      items: this.items,
      total: this.total(),
      delivery: this.delivery,
      tableNumber: this.delivery === 'mesa' ? this.selectedTableNumber : null,
      contactName: this.contactName,
      contactEmail: this.contactEmail
    };

    // Llamar API si existe
    if (this.cafSvc && typeof this.cafSvc.placeOrder === 'function') {
      this.cafSvc.placeOrder(payload).subscribe({
        next: () => {
          this.successMessage = 'Pedido enviado correctamente.';
          this.cart.clear?.();
          this.cart.clearReservation?.();
          this.loading = false;
          setTimeout(() => this.router.navigate(['/']), 1500);
        },
        error: (err: any) => {
          console.error(err);
          this.errorMessage = 'No se pudo enviar el pedido.';
          this.loading = false;
        }
      });
      return;
    }

    // Fallback simulado
    console.log('Pedido simulado:', payload);
    this.successMessage = 'Pedido simulado correctamente.';
    try { this.cart.clear?.(); this.cart.clearReservation?.(); } catch {}
    this.loading = false;
    setTimeout(() => this.router.navigate(['/']), 1500);
  }

  getReservation(): any {
    return this.cart.getReservation?.();
  }
}
