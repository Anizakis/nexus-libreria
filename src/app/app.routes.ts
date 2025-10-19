import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing';
import { SearchComponent } from './components/search/search';
import { CartComponent } from './components/cart/cart';
import { BookDetailComponent } from './components/book-detail/book-detail';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'search', component: SearchComponent },
  { path: 'cart', component: CartComponent},
  { path: 'book-detail/:id', component: BookDetailComponent }
];
