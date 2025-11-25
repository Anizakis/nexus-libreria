import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent {
  tienda = 'Nexus Librería';
  descripcion = 'Tu librería universitaria multifuncional';

  sections = [
    {
      title: 'Libros',
      description: 'Explora nuestro amplio catálogo de libros',
      icon: '📚',
      link: '/catalogo',
      color: 'primary'
    },
    {
      title: 'Cafetería',
      description: 'Disfruta de bebidas y productos frescos',
      icon: '☕',
      link: '/cafeteria',
      color: 'secondary'
    },
    {
      title: 'Coworking',
      description: 'Reserva espacios de trabajo profesionales',
      icon: '🏢',
      link: '/coworking',
      color: 'success'
    }
  ];
}
