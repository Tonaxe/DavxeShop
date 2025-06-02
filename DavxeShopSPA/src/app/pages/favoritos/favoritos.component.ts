import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../models/product.model';
import { User } from '../../models/user.model';
import { ApiService } from '../../services/api.service';
import { Estado } from '../../models/estado.model';

@Component({
  selector: 'app-favoritos',
  standalone: false,
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  user!: User;
  favoritos: Producto[] = [];
  estados: Estado[] = [];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    const estadosJson = sessionStorage.getItem('estados');
    if (estadosJson) {
      this.estados = JSON.parse(estadosJson);
    }
    
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      this.user = JSON.parse(sessionUser).user as User;
      this.apiService.getFavoritUsersProducts(this.user.userId).subscribe({
        next: (res) => {
          this.favoritos = res.userFavoritProducts;
        },
        error: (err) => {
          console.error('Error al cargar favoritos:', err);
          this.favoritos = [];
        }
      });
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