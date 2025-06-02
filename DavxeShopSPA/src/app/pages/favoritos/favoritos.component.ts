import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../models/product.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-favoritos',
  standalone: false,
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  user!: User;
  favoritos: Producto[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      this.user = JSON.parse(sessionUser).user as User;

      // Mock de productos favoritos con IDs numéricos válidos
      this.favoritos = [
        {
          productoId: 1,
          nombre: 'Auriculares Bluetooth',
          descripcion: 'Sonido envolvente y batería de larga duración.',
          categoria: 'Electrónica',
          precio: 79.99,
          fechaPublicacion: new Date(Date.now() - 2 * 86400000).toISOString(),
          imagenUrl: 'https://via.placeholder.com/300x200',
          estado: 1,
          userId: 101,
          userNombre: 'Juan Pérez',
          userCiudad: 'Madrid',
          comprado: false
        },
        {
          productoId: 2,
          nombre: 'Silla ergonómica',
          descripcion: 'Ideal para largas jornadas de estudio o trabajo.',
          categoria: 'Hogar',
          precio: 129.50,
          fechaPublicacion: new Date(Date.now() - 5 * 86400000).toISOString(),
          imagenUrl: 'https://via.placeholder.com/300x200',
          estado: 1,
          userId: 102,
          userNombre: 'Laura Gómez',
          userCiudad: 'Barcelona',
          comprado: false
        }
      ];
    }
  }

  verDetalle(producto: Producto): void {
    this.router.navigate(['/detalle', producto.productoId], {
      state: { producto }
    });
  }

  calcularTiempoPublicacion(fechaStr: string): string {
    const fecha = new Date(fechaStr);
    const diff = Math.floor((Date.now() - fecha.getTime()) / (1000 * 60 * 60 * 24));
    return `Hace ${diff} días`;
  }

}
