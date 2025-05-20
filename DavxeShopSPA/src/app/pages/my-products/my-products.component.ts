import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion: string;
  estado: 'nuevo' | 'usado' | 'como nuevo';
  fechaPublicacion: Date;
}

@Component({
  selector: 'app-my-products',
  standalone: false,
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent {
  constructor(private router: Router) {}

  nombreUsuario: string = "Tonaxea";

  productos: Producto[] = [
    {
      id: 1,
      nombre: 'iPhone 13 Pro',
      precio: 799,
      imagen: 'assets/iphone13.jpg',
      categoria: 'Tecnología',
      descripcion: 'iPhone 13 Pro en perfecto estado con 256GB de almacenamiento',
      estado: 'como nuevo',
      fechaPublicacion: new Date('2023-05-15')
    },
    {
      id: 2,
      nombre: 'Sofá de piel',
      precio: 450,
      imagen: 'assets/sofa.jpg',
      categoria: 'Hogar',
      descripcion: 'Sofá de piel color negro, tres plazas, excelente estado',
      estado: 'usado',
      fechaPublicacion: new Date('2023-06-20')
    },
    {
      id: 3,
      nombre: 'Bicicleta de montaña',
      precio: 350,
      imagen: 'assets/bicicleta.jpg',
      categoria: 'Deportes',
      descripcion: 'Bicicleta Trek Marlin 5, talla M, usada solo 3 meses',
      estado: 'como nuevo',
      fechaPublicacion: new Date('2023-07-10')
    },
    {
      id: 4,
      nombre: 'Libros de programación',
      precio: 120,
      imagen: 'assets/libros.jpg',
      categoria: 'Libros',
      descripcion: 'Colección de 5 libros sobre Angular, TypeScript y JavaScript',
      estado: 'usado',
      fechaPublicacion: new Date('2023-08-05')
    }
  ];

  navigateToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  verDetalle(producto: Producto) {
    this.router.navigate(['/product-detail', producto.id], {
      state: { producto }
    });
  }

  calcularTiempoPublicacion(fecha: Date): string {
    const diff = Math.floor((Date.now() - fecha.getTime()) / (1000 * 60 * 60 * 24));
    return 'Hace ' + diff + ' días';
  }

  getEstadoClass(estado: string): string {
    const clases = {
      'nuevo': 'estado-nuevo',
      'usado': 'estado-usado',
      'como nuevo': 'estado-como-nuevo'
    };
    return clases[estado as keyof typeof clases] || '';
  }
}