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

  // Contact carga lazy como componente standalone
  { path: 'contacto', loadComponent: () => import('./components/contact/contact').then(m => m.ContactComponent) },

  { path: 'search', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: '**', redirectTo: 'catalogo' }
];
