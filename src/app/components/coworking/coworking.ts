import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoworkingService } from '../../services/coworking';

@Component({
  selector: 'app-coworking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './coworking.html',
  styleUrls: ['./coworking.css']
})
export class CoworkingComponent implements OnInit {
  items: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private svc: CoworkingService) {}

  ngOnInit(): void {
    this.svc.getAll().subscribe({
      next: list => { this.items = list; this.loading = false; },
      error: err => { this.error = 'Error cargando espacios'; this.loading = false; console.error(err); }
    });
  }
}