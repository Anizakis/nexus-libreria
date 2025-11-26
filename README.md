# NexusLibreria

**Nexus Librería** es una aplicación web full-stack desarrollada con **Angular 20** que integra tres líneas de negocio: catálogo de libros, cafetería y espacios de coworking. Permite explorar productos, ver detalles, gestionar un carrito persistente y completar compras con opciones de entrega personalizadas.

Debido a fallos en la API externa, se implementó un sistema de fallback con base de datos local en JSON para garantizar funcionamiento estable y sin interrupciones.

**Versión:** 2.0  
**Angular CLI:** 20.3.2  
**Bootstrap:** 5.3.8  

---

## 🚀 Características Principales

✅ **Catálogo de Libros** - Búsqueda y filtrado avanzado  
✅ **Sección Cafetería** - Productos con categorización  
✅ **Coworking** - Reserva de salas con formulario reactivo  
✅ **Carrito Persistente** - LocalStorage integrado  
✅ **Checkout Modal** - Opciones de entrega (mostrador, mesa, sala)  
✅ **Formulario de Contacto** - Reactivo con validaciones  
✅ **API Fallback** - Funciona offline con datos locales  
✅ **Routing Dinámico** - Lazy loading en secciones secundarias  
✅ **Responsive Design** - Mobile, tablet, desktop  

---

## 📋 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── landing/              # Pantalla de bienvenida
│   │   ├── search/               # Catálogo de libros
│   │   ├── book-detail/          # Detalle de libro
│   │   ├── cafeteria/            # Catálogo cafetería
│   │   ├── cafeteria-detail/     # Detalle producto
│   │   ├── coworking/            # Listado salas
│   │   ├── coworking-detail/     # Reserva sala
│   │   ├── cart/                 # Carrito y checkout
│   │   ├── contact/              # Página contacto
│   │   └── header/               # Navbar global
│   ├── services/
│   │   ├── books.ts              # Servicio libros
│   │   ├── serviciocafeteria.ts  # Servicio cafetería
│   │   ├── serviciocoworking.ts  # Servicio coworking
│   │   └── cart.ts               # Servicio carrito
│   ├── app.routes.ts             # Configuración rutas
│   ├── app.config.ts             # Configuración app
│   └── app.ts                    # Componente raíz
├── assets/
│   └── books.json                # Base datos local
├── styles.css                    # Estilos globales
└── main.ts                       # Bootstrap
```

---

## 🛠️ Requisitos Previos

- **Node.js** (v18 o superior)
- **npm** (v9 o superior)
- **Angular CLI** (v20 o superior)

```bash
npm install -g @angular/cli@20
```

---

## ⚙️ Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Anizakis/nexus-libreria.git
cd nexus-libreria
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Verificar instalación**
```bash
ng version
```

---

## 🚀 Servidor de Desarrollo

Para iniciar el servidor de desarrollo en modo watch:

```bash
ng serve
```

O para abrir automáticamente en el navegador:

```bash
ng serve --open
```

Una vez que el servidor esté en ejecución, navega a **http://localhost:4200**. La aplicación se recargará automáticamente cada vez que modifiques archivos fuente.

---

## 🧩 Componentes Principales

### Landing
- Hero section mejorado con animaciones
- 3 cards destacadas (Libros, Cafetería, Coworking)
- Navegación a secciones principales

### Search (Catálogo)
- Búsqueda por título, autor, año, categoría
- Grid responsivo de libros
- Botones para detalle y carrito

### BookDetail
- Información completa del libro
- Selector de cantidad (1-99)
- Reseñas destacadas
- Integración con carrito

### Cafeteria
- Listado de productos
- Filtrado por categoría
- Navegación a detalle

### Coworking
- Listado de salas
- Formulario reactivo de reserva
- Integración con carrito

### Cart
- Modal de checkout con dos columnas
- Formulario contacto (nombre, email)
- Opciones de entrega personalizadas
- Resumen del pedido

### Contact
- Información de librería (horario, dirección, teléfono)
- Formulario reactivo de contacto
- Validaciones en tiempo real

---

## 🔄 Servicios

### BooksService
```typescript
getBooks(): Observable<any[]>        // Obtiene todos los libros
getBookById(id): Observable<any>     // Obtiene libro por ID
```

### CafeteriaService
```typescript
getProducts(): Observable<any[]>     // Obtiene productos
getProductById(id): Observable<any>  // Obtiene producto por ID
getCategories(): Observable<string[]> // Obtiene categorías
placeOrder(order): Observable<any>   // Realiza pedido
```

### CoworkingService
```typescript
getRooms(): Observable<any[]>        // Obtiene salas
getById(id): Observable<any>         // Obtiene sala por ID
reserveRoom(payload): Observable<any> // Realiza reserva
```

### CartService
```typescript
getItems(): CartItem[]               // Items actuales
add(item): void                      // Añade al carrito
updateQty(id, qty): void             // Actualiza cantidad
remove(id): void                     // Elimina item
clear(): void                        // Vacía carrito
getTotal(): number                   // Calcula total
saveReservation(roomId, date, hours) // Guarda reserva
getReservation(): any                // Obtiene reserva
```

---

## 📡 Rutas Disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Landing | Página inicio |
| `/catalogo` | Search | Catálogo libros |
| `/catalogo/:id` | BookDetail | Detalle libro |
| `/cafeteria` | Cafeteria | Catálogo cafetería |
| `/cafeteria/:id` | CafeteriaDetail | Detalle producto |
| `/coworking` | Coworking | Listado salas |
| `/coworking/:id` | CoworkingDetail | Reserva sala |
| `/contacto` | Contact | Contacto |
| `/cart` | Cart | Carrito compras |

---

## 💾 Data Binding y Directivas

### Data Binding
- ✅ **Interpolación** `{{ variable }}`
- ✅ **Property Binding** `[propiedad]="valor"`
- ✅ **Event Binding** `(evento)="función()"`
- ✅ **Two-way Binding** `[(ngModel)]="propiedad"`

### Directivas Estructurales
- ✅ `*ngIf="condición"` - Renderizado condicional
- ✅ `*ngFor="let item of items"` - Iteración
- ✅ `*ngIf; else` - Renderizado avanzado

### Directivas de Atributo
- ✅ `[ngClass]="{'clase': condición}"` - Clases dinámicas
- ✅ `[disabled]="condición"` - Atributos dinámicos

---

## 🎨 Formularios Reactivos

### Validaciones Implementadas
```typescript
FormBuilder.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  message: ['', [Validators.required, Validators.minLength(10)]],
  quantity: [1, [Validators.required, Validators.min(1)]]
})
```

---

## 📦 Compilación

Para compilar el proyecto para producción:

```bash
ng build --configuration production
```

Los archivos compilados se generarán en el directorio `dist/nexus-libreria`. La compilación optimiza la aplicación para rendimiento máximo.

---

## 🧪 Testing

Ejecutar tests unitarios:

```bash
ng test
```

Ejecutar tests con coverage:

```bash
ng test --code-coverage
```

---

## 🔧 Generación de Código

Angular CLI incluye herramientas potentes de scaffolding:

### Generar componente standalone
```bash
ng generate component components/mi-componente --standalone
```

### Generar servicio
```bash
ng generate service services/mi-servicio
```

### Ver todos los esquemas disponibles
```bash
ng generate --help
```

---

## 🌐 API y Fallback

### Funcionamiento
1. **Intenta conectar con API externa**
2. **Si falla, usa JSON local** (`assets/books.json`)
3. **Garantiza experiencia sin interrupciones**

### Configuración
```typescript
// En BooksService
private apiUrl = 'https://tu-api.com/books';
private fallbackUrl = 'assets/books.json';

getBooks(): Observable<any[]> {
  return this.http.get(this.apiUrl).pipe(
    catchError(err => {
      console.warn('API falló, usando fallback');
      return this.http.get(this.fallbackUrl);
    })
  );
}
```

---

## 💾 LocalStorage

La aplicación utiliza localStorage para:
- **Carrito persistente** - Mantiene items entre sesiones
- **Reservas** - Guarda datos de reserva de salas
- **Preferencias** - Almacena selecciones del usuario

---

## 📱 Responsive Design

- ✅ Mobile (< 480px)
- ✅ Tablet (480px - 1024px)
- ✅ Desktop (> 1024px)

Breakpoints CSS:
```css
@media (max-width: 480px) { /* Mobile */ }
@media (max-width: 768px) { /* Tablet */ }
@media (max-width: 1024px) { /* Desktop pequeño */ }
```

---

## 🚀 Deployment

### Netlify
```bash
ng build --configuration production
# Sube la carpeta 'dist/nexus-libreria' a Netlify
```

### Vercel
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm install -g angular-cli-ghpages
ng build --base-href "/nexus-libreria/"
ngh --dir=dist/nexus-libreria
```

---

## 📚 Dependencias Principales

```json
{
  "@angular/common": "^20.3.0",
  "@angular/compiler": "^20.3.0",
  "@angular/core": "^20.3.0",
  "@angular/forms": "^20.3.0",
  "@angular/platform-browser": "^20.3.0",
  "@angular/router": "^20.3.0",
  "bootstrap": "^5.3.8",
  "rxjs": "~7.8.0",
  "zone.js": "~0.15.0"
}
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto 4200 en uso
```bash
ng serve --port 4300
```

### Limpiar caché
```bash
ng cache clean
```

---

## 📞 Soporte

- **GitHub Issues:** [Reportar problemas](https://github.com/Anizakis/nexus-libreria/issues)
- **Documentación:** Ver `Documentación_Nexus_Libreria_Act2.pdf`

---

## 👤 Autor

**Ana Piñero Pérez**

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver `LICENSE` para más detalles.

---

## 🔗 Enlaces Útiles

- [Angular Docs](https://angular.dev)
- [Bootstrap](https://getbootstrap.com)
- [RxJS](https://rxjs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [GitHub Repo](https://github.com/Anizakis/nexus-libreria)

---

**Última actualización:** 2024  
**Versión:** 2.0.0  
**Angular:** 20.3.2
