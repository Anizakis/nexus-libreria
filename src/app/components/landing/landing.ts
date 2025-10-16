import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent {
  tienda = 'Librería Nexus';
  descripcion = 'Bienvenido a Nexus, tu espacio universitario para libros, coworking y cafetería. Descubre nuestro catálogo y disfruta de un ambiente único.';
}