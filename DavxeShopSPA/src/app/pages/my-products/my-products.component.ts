import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion: string;
  fechaPublicacion: Date;
}

@Component({
  selector: 'app-my-products',
  standalone: true,
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
productos: Producto[] = [];
  userId: number = Number(sessionStorage.getItem('userId'));
  nombreUsuario: string = 'Tonaxea';

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProductosPorUsuario(this.userId).subscribe({
      next: (productos: ProductoResponse[]) => {
        this.productos = productos.map(p => ({
          id: p.productoId,
          nombre: p.nombre,
          precio: p.precio,
          imagen: p.imagenUrl,
          categoria: p.categoria,
          descripcion: p.descripcion,
          fechaPublicacion: new Date(p.fechaPublicacion),
        }));
      },
      error: (err: any) => {
        console.error('Error al cargar productos del usuario:', err);
      }
    });
  }

  navigateToAddProduct(): void {
    this.router.navigate(['/add-product']);
  }

  verDetalle(producto: Producto): void {
    this.router.navigate(['/product-detail', producto.id], {
      state: { producto }
    });
  }

  calcularTiempoPublicacion(fecha: Date): string {
    const diff = Math.floor((Date.now() - fecha.getTime()) / (1000 * 60 * 60 * 24));
    return 'Hace ' + diff + ' días';
  }
}
