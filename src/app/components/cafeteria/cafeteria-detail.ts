import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CafeteriaService } from '../../services/cafeteria';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cafeteria-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cafeteria-detail.html',
  styleUrls: ['./cafeteria-detail.css']
})
export class CafeteriaDetailComponent implements OnInit {
  product: any = null;
  loading = true;
  error: string | null = null;
  form!: FormGroup;
  placing = false;
  successMessage = '';

  constructor(private route: ActivatedRoute, private svc: CafeteriaService, private fb: FormBuilder) {
    this.form = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      note: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.svc.getProductById(id).subscribe({
      next: p => { this.product = p; this.loading = false; },
      error: err => { console.error(err); this.error = 'No se pudo cargar el producto.'; this.loading = false; }
    });
  }

  placeOrder(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const payload = {
      productId: this.product?.id,
      name: this.product?.name,
      quantity: this.form.value.quantity,
      note: this.form.value.note
    };
    this.placing = true;
    this.svc.placeOrder(payload).subscribe({
      next: res => { this.successMessage = 'Pedido enviado correctamente.'; this.placing = false; this.form.reset({ quantity:1, note: '' }); },
      error: err => { console.error(err); this.error = 'Error al enviar el pedido.'; this.placing = false; }
    });
  }
}