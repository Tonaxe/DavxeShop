import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Producto, UsuarioConProductos } from '../../models/product.model';
import { Categoria } from '../../models/categoria.model';
import { forkJoin } from 'rxjs';

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

  @ViewChildren('contenedor') contenedores!: QueryList<ElementRef>;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    forkJoin({
      productosAleatorios: this.apiService.getRandomProductos(),
      categorias: this.apiService.getAllCategorias(),
      userProducts: this.apiService.getRandomProductosUsers()
    }).subscribe({
      next: ({ productosAleatorios, categorias, userProducts }) => {
        this.productosAleatorios = productosAleatorios.productos;
        this.categorias = categorias.categorias;
        this.userProducts = userProducts.userProducts;

        sessionStorage.setItem("categorias", JSON.stringify(this.categorias));
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
    this.router.navigate(['/detalle'], {
      state: { producto: producto }
    });
  }

  toggleDropdown() {
    this.dropdownAbierto = !this.dropdownAbierto;
  }

  calcularTiempoPublicacion(fechaStr: string): string {
    const fecha = new Date(fechaStr);
    const diff = Math.floor((Date.now() - fecha.getTime()) / (1000 * 60 * 60 * 24));
    return 'Hace ' + diff + ' días';
  }
}
