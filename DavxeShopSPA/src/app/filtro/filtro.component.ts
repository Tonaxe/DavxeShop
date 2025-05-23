import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../models/product.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-filtro',
  standalone: false,
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent implements OnInit {
  productos: Producto[] = [];
  categoriaId?: number;
  categoriaNombre: string = '';
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query']?.trim() || '';
      this.categoriaId = +params['categoria'];
      this.categoriaNombre = params['nombre'] || '';

      if (this.query.length >= 2) {
        this.apiService.getSearchedProducts(this.query).subscribe({
          next: (res) => {
            this.productos = this.ordenarProductosPorPrefijo(res.productos, this.query);
            this.categoriaNombre = `Resultados para "${this.query}"`;
          },
          error: (err) => {
            console.error('Error buscando productos:', err);
            this.productos = [];
          }
        });
      } else if (this.categoriaId) {
        this.apiService.getProductosByCategoria(this.categoriaId).subscribe({
          next: (res) => {
            this.productos = res.productos;
          },
          error: (err) => console.error('Error al cargar productos por categoría:', err)
        });
      } else {
        this.productos = [];
      }
    });
  }

  ordenarProductosPorPrefijo(productos: Producto[], query: string): Producto[] {
    const q = query.toLowerCase();
    const empiezanCon = productos.filter(p => p.nombre.toLowerCase().startsWith(q));
    const contienen = productos.filter(p => p.nombre.toLowerCase().includes(q) && !p.nombre.toLowerCase().startsWith(q));
    return [...empiezanCon, ...contienen];
  }

  verDetalle(producto: Producto) {
    this.router.navigate(['/detalle', producto.productoId]);
  }

  calcularTiempoPublicacion(fecha: string): string {
    const ahora = new Date();
    const publicacion = new Date(fecha);
    const diffMs = ahora.getTime() - publicacion.getTime();
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDias === 0) return 'Hoy';
    if (diffDias === 1) return 'Ayer';
    if (diffDias < 7) return `${diffDias} días`;
    if (diffDias < 30) return `${Math.floor(diffDias / 7)} semanas`;
    return `${Math.floor(diffDias / 30)} meses`;
  }

  formatEstado(estado: string): string {
    return 'estado-' + estado.toLowerCase().replace(/\s/g, '-');
  }
}