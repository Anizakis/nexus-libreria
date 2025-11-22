import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing';
import { SearchComponent } from './components/search/search';
import { CartComponent } from './components/cart/cart';
import { BookDetailComponent } from './components/book-detail/book-detail';

// Rutas de la aplicación
export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'catalogo', component: SearchComponent },
  { path: 'catalogo/:id', component: BookDetailComponent },
  { path: 'cart', component: CartComponent },

  // Carga lazy de componentes standalone
  { path: 'cafeteria', loadComponent: () => import('./components/cafeteria/cafeteria').then(m => m.CafeteriaComponent) },
  { path: 'cafeteria/:id', loadComponent: () => import('./components/cafeteria/cafeteria-detail').then(m => m.CafeteriaDetailComponent) },

  { path: 'coworking', loadComponent: () => import('./components/coworking/coworking').then(m => m.CoworkingComponent) },
  { path: 'coworking/:id', loadComponent: () => import('./components/coworking/coworking-detail').then(m => m.CoworkingDetailComponent) },

  { path: 'contacto', loadComponent: () => import('./components/contact/contact').then(m => m.ContactComponent) },

  { path: 'search', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: '**', redirectTo: 'catalogo' }
];
