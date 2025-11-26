import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CoworkingService } from '../../services/serviciocoworking';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-coworking-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './coworking-detail.html',
  styleUrls: ['./coworking-detail.css']
})
export class CoworkingDetailComponent implements OnInit, OnDestroy {
  item: any = null;
  loading = true;
  error: string | null = null;
  booking = false;
  successMessage = '';
  addedMessage: string | null = null;
  form!: FormGroup;
  private subscription: any;

  constructor(
    private route: ActivatedRoute,
    private svc: CoworkingService,
    private fb: FormBuilder,
    private cart: CartService,
    private router: Router
  ) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      hours: [1, [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.subscription = this.svc.getById(id).subscribe({
      next: (res: any) => {
        this.item = res;
        this.loading = false;
        console.log('✅ SALA RECIBIDA:', res);
        console.log('🖼️ IMAGEN:', res?.image);
       },
       error: (err: any) => {
         console.error(err);
         this.error = 'No se pudo cargar la sala.';
         this.loading = false;
       }
     });
   }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addToCart(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.booking = true;

    // Guardar reserva en localStorage
    this.cart.saveReservation(
      this.item.id,
      this.form.value.date,
      Number(this.form.value.hours)
    );

    // Añadir sala al carrito
    this.cart.add({
      id: `room_${this.item.id}`,
      title: this.item.name,
      price: this.item?.precio ?? 0,
      image: this.item.image,
      qty: 1,
      meta: {
        type: 'room',
        roomId: this.item.id,
        date: this.form.value.date,
        hours: this.form.value.hours,
        notes: this.form.value.notes
      }
    } as any);

    this.addedMessage = 'Sala añadida al carrito.';
    this.booking = false;
    this.form.reset({ date: '', hours: 1, notes: '' });
    setTimeout(() => this.addedMessage = null, 2500);
  }

  back(): void {
    this.router.navigate(['/coworking']);
  }
}
