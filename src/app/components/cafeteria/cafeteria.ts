import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CafeteriaService } from '../../services/cafeteria';

@Component({
  selector: 'app-cafeteria',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cafeteria.html',
  styleUrls: ['./cafeteria.css']
})
export class CafeteriaComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  loading = true;
  error: string | null = null;

  // seleccionado actual (nombre de categoría) — null = mostrar todos
  selectedCategoryName: string | null = null;

  constructor(private svc: CafeteriaService) {}

  ngOnInit(): void {
    this.svc.getProducts().subscribe({
      next: list => { this.products = list || []; this.loading = false; },
      error: err => { console.error(err); this.error = 'No se pudieron cargar los productos.'; this.loading = false; }
    });

    this.svc.getCategories().subscribe({
      next: cats => this.categories = cats || [],
      error: err => { console.warn('No se pudieron cargar categorías', err); }
    });
  }

  // Devuelve la etiqueta de una categoría (soporta string o objeto)
  getCategoryLabel(cat: any): string {
    if (!cat && cat !== 0) return '';
    if (typeof cat === 'string') return cat;
    if (typeof cat === 'number') return String(cat);
    return cat?.nombre ?? cat?.name ?? cat?.title ?? cat?.label ?? JSON.stringify(cat);
  }

  // Seleccionar / deseleccionar categoría por nombre
  selectCategory(cat: any) {
    const name = this.getCategoryLabel(cat);
    this.selectedCategoryName = this.selectedCategoryName === name ? null : name;
  }

  // Comprueba si un producto pertenece a la categoría seleccionada
  matchesSelectedCategory(product: any): boolean {
    if (!this.selectedCategoryName) return true;
    const cat = this.selectedCategoryName.toLowerCase();

    // productos pueden tener category: string | {nombre:...} | array
    const prodCat = product?.category ?? product?.categoria ?? product?.categories ?? null;

    if (!prodCat) return false;

    if (typeof prodCat === 'string') return prodCat.toLowerCase() === cat;
    if (Array.isArray(prodCat)) {
      return prodCat.some((c: any) => (typeof c === 'string' ? c.toLowerCase() : (c?.nombre ?? c?.name ?? '').toLowerCase()) === cat);
    }
    // objeto
    const name = (prodCat?.nombre ?? prodCat?.name ?? '').toString().toLowerCase();
    return name === cat;
  }

  // Productos ya filtrados
  get filteredProducts(): any[] {
    return this.products.filter(p => this.matchesSelectedCategory(p));
  }
}