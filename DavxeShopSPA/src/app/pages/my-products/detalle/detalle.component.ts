import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  standalone: false,
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {
  esFavorito: boolean = false;

  producto: any = {
    nombre: 'Producto Ejemplo',
    precio: 49.99,
    descripcion: 'Esta es una descripción detallada del producto...',
    categoria: 'moda',
    imagen: '../assets/logo.png'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  toggleFavorito() {
    this.esFavorito = !this.esFavorito;
  }

  getCategoriaNombre(categoriaKey: string): string {
    const categorias: {[key: string]: string} = {
      'coche': 'Coche',
      'moto': 'Moto',
      'hogar': 'Hogar',
      'moda': 'Moda',
      'tecnologia': 'Tecnología'
    };
    return categorias[categoriaKey] || categoriaKey;
  }

  volverAtras() {
    this.router.navigate(['/my-products']);
  }

  editarProducto() {
    this.router.navigate(['/editar-producto']);
  }

  Chat() {
    this.router.navigate(['/chat']);
  }
}