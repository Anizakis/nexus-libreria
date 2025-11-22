import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoworkingService } from '../../services/coworking';

@Component({
  selector: 'app-coworking-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './coworking-detail.html',
  styleUrls: ['./coworking-detail.css']
})
export class CoworkingDetailComponent implements OnInit {
  item: any = null;
  loading = true;
  error: string | null = null;
  form!: FormGroup;
  booking = false;
  successMessage = '';

  constructor(private route: ActivatedRoute, private svc: CoworkingService, private fb: FormBuilder) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      hours: [1, [Validators.required, Validators.min(1)]],
      note: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.svc.getById(id).subscribe({
      next: res => { this.item = res; this.loading = false; },
      error: err => { console.error(err); this.error = 'No se pudo cargar el espacio.'; this.loading = false; }
    });
  }

  placeBooking(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    // por ahora simula reserva (si quieres, podemos POSTear a un endpoint)
    this.booking = true;
    setTimeout(() => {
      this.successMessage = 'Solicitud de reserva enviada.';
      this.booking = false;
      this.form.reset({ date: '', hours: 1, note: '' });
    }, 800);
  }
}