import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Producto } from '../../models/product.model';
import { Categoria } from '../../models/categoria.model';

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

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getRandomProductos().subscribe(
      (res) => {
        this.productosAleatorios = res.productos;
      },
      (error) => { }
    );

    this.apiService.getAllCategorias().subscribe(
      (res) => {
        this.categorias = res.categorias;
        sessionStorage.setItem("categorias", JSON.stringify(this.categorias));
      },
      (error) => { }
    );
  }

  categoriasPrincipales = [
    { id: 'coche', nombre: 'Coche' },
    { id: 'moto', nombre: 'Moto' },
    { id: 'motor', nombre: 'Motor' },
    { id: 'hogar', nombre: 'Hogar' }
  ];

  categoriasSecundarias = [
    { id: 'moda', nombre: 'Moda' },
    { id: 'inmobiliaria', nombre: 'Inmobiliaria' },
    { id: 'gym', nombre: 'Gym' },
    { id: 'tecnologia', nombre: 'Tecnología' },
    { id: 'accesorios', nombre: 'Accesorios' }
  ];

  @ViewChild('contenedor', { static: false }) contenedor!: ElementRef;

  productos = [
    { nombre: 'Producto 1', imagen: 'assets/1.png' },
    { nombre: 'Producto 2', imagen: 'assets/1.png' },
    { nombre: 'Producto 3', imagen: 'assets/1.png' },
    { nombre: 'Producto 4', imagen: 'assets/1.png' },
    { nombre: 'Producto 5', imagen: 'assets/1.png' },
    { nombre: 'Producto 6', imagen: 'assets/1.png' },
    { nombre: 'Producto 7', imagen: 'assets/1.png' },
    { nombre: 'Producto 8', imagen: 'assets/1.png' },
    { nombre: 'Producto 9', imagen: 'assets/1.png' },
    { nombre: 'Producto 10', imagen: 'assets/1.png' },
    { nombre: 'Producto 11', imagen: 'assets/1.png' },
    { nombre: 'Producto 12', imagen: 'assets/1.png' },
    { nombre: 'Producto 13', imagen: 'assets/1.png' },
    { nombre: 'Producto 14', imagen: 'assets/1.png' },
    { nombre: 'Producto 15', imagen: 'assets/1.png' },
  ];


  scrollLeft() {
    this.contenedor.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.contenedor.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
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
