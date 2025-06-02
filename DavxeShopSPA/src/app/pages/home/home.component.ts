import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Producto, ProductoResponse, UsuarioConProductos } from '../../models/product.model';
import { Categoria } from '../../models/categoria.model';
import { forkJoin } from 'rxjs';
import { Estado } from '../../models/estado.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nombreUsuario: string = "Tonaxe";
  dropdownAbierto: boolean = false;
  productosAleatorios: Producto[] = [];
  categorias: Categoria[] = [];
  userProducts: UsuarioConProductos[] = [];
  estados: Estado[] = [];

  @ViewChildren('contenedor') contenedores!: QueryList<ElementRef>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    forkJoin({
      productosAleatorios: this.apiService.getRandomProductos(),
      categorias: this.apiService.getAllCategorias(),
      userProducts: this.apiService.getRandomProductosUsers(),
      estados: this.apiService.getAllEstados()
    }).subscribe({
      next: ({ productosAleatorios, categorias, userProducts, estados }) => {
        this.productosAleatorios = productosAleatorios.productos;
        this.productosAleatorios.forEach(producto => {
          producto.imagenUrl = producto.imagenUrl.replace('/upload/', '/upload/w_500,f_auto,q_auto/');
        });
        this.categorias = categorias.categorias;
        this.userProducts = userProducts.userProducts;
        this.estados = estados.estados;

        sessionStorage.setItem("categorias", JSON.stringify(this.categorias));
        sessionStorage.setItem("estados", JSON.stringify(estados.estados));
      },
      error: (err) => {
        console.error("Error al cargar datos:", err);
      }
    });
  }

  scrollLeft(index: number) {
    const contenedor = this.contenedores.toArray()[index];
    if (contenedor) {
      contenedor.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight(index: number) {
    const contenedor = this.contenedores.toArray()[index];
    if (contenedor) {
      contenedor.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  verDetalle(producto: any) {
    this.router.navigate(['/detalle', producto.productoId]);
  }


  toggleDropdown() {
    this.dropdownAbierto = !this.dropdownAbierto;
  }

  calcularTiempoPublicacion(fechaStr: string): string {
    const fecha = new Date(fechaStr);
    const diff = Math.floor((Date.now() - fecha.getTime()) / (1000 * 60 * 60 * 24));
    return 'Hace ' + diff + ' días';
  }

  formatEstado(estadoId: number): string {
    const estado = this.estados.find(e => e.estadoId === estadoId);
    if (!estado) return 'estado-desconocido';
    return 'estado-' + estado.nombre.toLowerCase().replace(/\s/g, '-');
  }

  getNombreEstado(estadoId: number): string {
    const estado = this.estados.find(e => e.estadoId === estadoId);
    return estado ? estado.nombre : 'Desconocido';
  }
}
