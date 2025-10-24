import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent {
  tienda = 'Librería Nexus';
  descripcion = 'Bienvenido a Nexus, tu espacio universitario para libros, coworking y cafetería. Descubre nuestro catálogo y disfruta de un ambiente único.';
  heroImage = 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d';
}
