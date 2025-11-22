import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent implements OnInit {
  libraryInfo: any = null;
  loadingInfo = true;
  infoError: string | null = null;

  form!: FormGroup;
  submitted = false;
  successMessage = '';

  private infoUrl = 'https://mock.apidog.com/m1/1069422-1057565-default/librería';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.http.get<any>(this.infoUrl).subscribe({
      next: (data) => {
        console.log('API library info raw:', data);
        // Usar la respuesta tal cual (si es array, tomar primer elemento)
        this.libraryInfo = Array.isArray(data) ? data[0] : data;
        this.loadingInfo = false;
      },
      error: (err) => {
        this.infoError = 'No se pudo cargar la información general.';
        this.loadingInfo = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted = true;
    this.successMessage = 'Solicitud enviada. Gracias por contactarnos — te responderemos pronto.';
    this.form.reset();
  }

  // Devuelve el horario ordenado de Lunes a Domingo con los nombres en español
  get orderedHours(): { day: string; time: string }[] {
    const mapping = [
      { key: 'monday', label: 'Lunes' },
      { key: 'tuesday', label: 'Martes' },
      { key: 'wednesday', label: 'Miércoles' },
      { key: 'thursday', label: 'Jueves' },
      { key: 'friday', label: 'Viernes' },
      { key: 'saturday', label: 'Sábado' },
      { key: 'sunday', label: 'Domingo' }
    ];

    const hoursObj = this.libraryInfo?.['hours'] ?? this.libraryInfo?.['horario'] ?? null;
    if (!hoursObj) return [];

    return mapping.map(m => {
      // usar notación de corchetes por si TS exige index signature
      const time = hoursObj[m.key] ?? hoursObj[m.label?.toLowerCase?.()] ?? 'Cerrado';
      return { day: m.label, time };
    });
  }
}
