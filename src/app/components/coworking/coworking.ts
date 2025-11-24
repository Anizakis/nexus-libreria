import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CoworkingService } from '../../services/serviciocoworking';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-coworking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './coworking.html',
  styleUrls: ['./coworking.css']
})
export class CoworkingComponent implements OnInit {
  rooms: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private svc: CoworkingService, private router: Router) {}

  ngOnInit(): void {
    this.svc.getRooms().subscribe({
      next: r => { this.rooms = r || []; this.loading = false; },
      error: e => { console.error(e); this.error = 'No se pudieron cargar las salas.'; this.loading = false; }
    });
  }

  goToDetail(roomId: string | number): void {
    this.router.navigate(['/coworking', roomId]);
  }
}
